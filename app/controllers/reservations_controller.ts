import { DateTime } from 'luxon'
import { createReservationValidator } from '#validators/reservation' 
import Material from '#models/material'
import Reservation from '#models/reservation'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReservationsController {

  async index({ view }: HttpContext) {
    const materials = await Material.all()
    const reservations = await Reservation.all()

    const materialsWithAvailability = await Promise.all(
      materials.map(async (material) => {
        const reservedQuantity = await this.getReservedQuantity(
          material.id,
          DateTime.now().toISODate()!,
          DateTime.now().toISODate()!
        )

        return {
          ...material.serialize(),
          availableQuantity: Math.max(
            0,
            material.quantity - reservedQuantity
          ),
        }
      })
    )

    return view.render('pages/reservations/index', {
      materials: materialsWithAvailability,
      reservations,
    })
  }




  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(createReservationValidator)

    // Vérifier les dates
    if (data.end_date < data.start_date) {
      session.flash(
        'error',
        'La date de fin doit être postérieure ou égale à la date de début.'
      )
      return response.redirect('/reservations')
    }

    // Récupérer le matériel
    const material = await Material.findOrFail(data.material_id)

    // Vérifier que la quantité demandée ne dépasse pas le stock total
    if (data.quantity > material.quantity) {
      session.flash(
        'error',
        'La quantité demandée dépasse la quantité totale de ce matériel.'
      )
      return response.redirect('/reservations')
    }

    // Calculer la quantité déjà réservée sur cette période
    const reservedQuantity = await this.getReservedQuantity(
      material.id,
      data.start_date,
      data.end_date
    )

    // Vérifier qu'il reste assez de matériel
    if (reservedQuantity + data.quantity > material.quantity) {
      session.flash(
        'error',
        `Stock insuffisant sur cette période. Quantité totale : ${material.quantity}, déjà réservée : ${reservedQuantity}.`
      )
      return response.redirect('/reservations')
    }

    // Enregistrer la réservation
    await Reservation.create({
      materialId: material.id,
      borrowerName: data.borrower_name,
      startDate: DateTime.fromISO(data.start_date),
      endDate: DateTime.fromISO(data.end_date),
      quantity: data.quantity,
      status: 'pending',
    })

    // Confirmer la réservation
    session.flash('success', 'La réservation a bien été enregistrée.')
    return response.redirect('/reservations')
  }


  private async getReservedQuantity(
    materialId: number,
    startDate: string,
    endDate: string
  ): Promise<number> {
    // Récupérer les réservations qui chevauchent la période demandée
    const reservations = await Reservation.query()
      .where('material_id', materialId)
      .where('start_date', '<=', endDate)
      .where('end_date', '>=', startDate)
      .whereNot('status', 'cancelled')

    let maxReservedQuantity = 0

    let currentDate = DateTime.fromISO(startDate)
    const lastDate = DateTime.fromISO(endDate)

    // Examiner chaque jour de la période
    while (currentDate <= lastDate) {
      const date = currentDate.toISODate()!

      // Calculer la quantité réservée pour ce jour
      const reservedForDay = reservations.reduce(
        (total, reservation) => {
          const reservationStart = reservation.startDate.toISODate()!
          const reservationEnd = reservation.endDate.toISODate()!

          if (reservationStart <= date && reservationEnd >= date) {
            return total + reservation.quantity
          }

          return total
        },
        0
      )

      // Garder la quantité maximale réservée simultanément
      maxReservedQuantity = Math.max(
        maxReservedQuantity,
        reservedForDay
      )

      currentDate = currentDate.plus({ days: 1 })
    }

    return maxReservedQuantity
  }



  async availability({ request, response }: HttpContext) {
    const materialId = Number(request.input('material_id'))
    const startDate = request.input('start_date')
    const endDate = request.input('end_date')

    if (
      !Number.isInteger(materialId) ||
      materialId <= 0 ||
      typeof startDate !== 'string' ||
      typeof endDate !== 'string' ||
      endDate < startDate
    ) {
      return response.badRequest({
        message: 'Veuillez choisir un matériel et une période valide.',
      })
    }

    const material = await Material.findOrFail(materialId)

    const reservedQuantity = await this.getReservedQuantity(
      material.id,
      startDate,
      endDate
    )

    return response.ok({
      availableQuantity: Math.max(
        0,
        material.quantity - reservedQuantity
      ),
    })
  }



}

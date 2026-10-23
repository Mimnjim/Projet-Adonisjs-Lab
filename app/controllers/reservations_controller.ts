import { DateTime } from 'luxon'
import { createReservationValidator } from '#validators/reservation' 
import Material from '#models/material'
import Reservation from '#models/reservation'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReservationsController {

  async index({ view }: HttpContext) {
    const materials = await Material.all()
    const reservations = await Reservation.query().preload('material')

    return view.render('pages/reservations/index', {
      materials,
      reservations,
    })

  }


  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(createReservationValidator)
    const startDate = data.start_date.toISODate()!
    const endDate = data.end_date.toISODate()!

    // Vérifier les dates
    if (endDate < startDate) {
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
      startDate,
      endDate
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
      startDate: data.start_date,
      endDate: data.end_date,
      quantity: data.quantity,
      status: 'pending',
    })

    // Confirmer la réservation
    session.flash('success', 'La réservation a bien été enregistrée.')
    return response.redirect('/reservations')
  }

  // Calcule le maximum d'exemplaires réservés en même temps sur la période demandée.
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



  // Vérifie les données reçues, calcule la quantité disponible sur la période demandée et renvoie le résultat au formulaire.
  async availability({ request, response }: HttpContext) {
    const materialId = Number(request.input('material_id'))
    const startDate = request.input('start_date')
    const endDate = request.input('end_date')

    // Vérifier les identifiants et les types reçus
    if (
      !Number.isInteger(materialId) ||
      materialId <= 0 ||
      typeof startDate !== 'string' ||
      typeof endDate !== 'string'
    ) {
      return response.badRequest({
        message: 'Veuillez choisir un matériel et une période valide.',
      })
    }

    // Vérifier le format et l'existence réelle des dates
    const parsedStartDate = DateTime.fromFormat(startDate, 'yyyy-MM-dd')
    const parsedEndDate = DateTime.fromFormat(endDate, 'yyyy-MM-dd')

    if (
      !parsedStartDate.isValid ||
      !parsedEndDate.isValid ||
      parsedStartDate.toISODate() !== startDate ||
      parsedEndDate.toISODate() !== endDate ||
      endDate < startDate
    ) {
      return response.badRequest({
        message: 'Veuillez choisir des dates réelles et une période valide.',
      })
    }

    // Récupérer le matériel
    const material = await Material.findOrFail(materialId)

    // Calculer le stock déjà réservé sur cette période
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

  async cancel({ params, response, session }: HttpContext) {
    const reservation = await Reservation.findOrFail(params.id)

    if (reservation.status === 'cancelled') {
      session.flash('error', 'Cette réservation est déjà annulée.')
      return response.redirect('/reservations')
    }

    reservation.status = 'cancelled'
    await reservation.save()

    session.flash('success', 'La réservation a bien été annulée.')
    return response.redirect('/reservations')
  }


}

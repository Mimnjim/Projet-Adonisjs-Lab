import { DateTime } from 'luxon'
import { createReservationValidator } from '#validators/reservation' 
import Material from '#models/material'
import Reservation from '#models/reservation'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReservationsController {
  async index({ view }: HttpContext) {
    const materials = await Material.all()
    const reservations = await Reservation.all()

    return view.render('pages/reservations/index', {
      materials,
      reservations,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(createReservationValidator)

    if (data.end_date < data.start_date) {
        session.flash('error', 'La date de fin doit être postérieure ou égale à la date de début.')
        return response.redirect('/reservations')
    }

    const material = await Material.findOrFail(data.material_id)

    await Reservation.create({
        materialId: material.id,
        borrowerName: data.borrower_name,
        startDate: DateTime.fromISO(data.start_date),
        endDate: DateTime.fromISO(data.end_date),
        status: 'pending',
    })

    session.flash('success', 'La réservation a bien été enregistrée.')
    return response.redirect('/reservations')
  }


}

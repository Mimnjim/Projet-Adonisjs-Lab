import Reservation from '#models/reservation'
import { createMaterialValidator } from '#validators/material'
import Material from '#models/material'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaterialsController {
  async index({ view }: HttpContext) {
    const materials = await Material.all()

    return view.render('pages/materials/index', { materials })
  }

  async edit({ params, view }: HttpContext) {
    const material = await Material.findOrFail(params.id)
    
    return view.render('pages/materials/edit', { material })
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createMaterialValidator)

    await Material.create({
      name: data.name,
      description: data.description || null,
      category: data.category,
      quantity: Number(data.quantity),
    })

    return response.redirect('/materials')
  }

  async update({ params, request, response }: HttpContext) {
    const material = await Material.findOrFail(params.id)

    const data = await request.validateUsing(createMaterialValidator)

    material.merge({
        name: data.name,
        category: data.category,
        description: data.description || null,
        quantity: data.quantity,
    })

    await material.save()

    return response.redirect('/materials')
  }

  async destroy({ params, response, session }: HttpContext) {
    const material = await Material.findOrFail(params.id)

    const activeReservation = await Reservation.query()
      .where('material_id', material.id)
      .whereNot('status', 'cancelled')
      .first()

    if (activeReservation) {
      session.flash(
        'error',
        'Impossible de supprimer ce matériel : il possède encore des réservations actives.'
      )

      return response.redirect('/materials')
    }

    await material.delete()

    session.flash('success', 'Le matériel a bien été supprimé.')
    return response.redirect('/materials')
  }


}

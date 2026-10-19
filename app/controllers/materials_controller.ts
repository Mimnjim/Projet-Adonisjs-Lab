import { createMaterialValidator } from '#validators/material'
import Material from '#models/material'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaterialsController {
  async index({ view }: HttpContext) {
    const materials = await Material.all()

    return view.render('pages/materials/index', { materials })
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
}

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

  async destroy({ params, response }: HttpContext) {
    const material = await Material.findOrFail(params.id)

    await material.delete()

    return response.redirect('/materials')
  }


}

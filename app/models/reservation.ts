import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { ReservationSchema } from '#database/schema'
import Material from '#models/material'

export default class Reservation extends ReservationSchema {
  @belongsTo(() => Material, {
    foreignKey: 'materialId',
  })
  declare material: BelongsTo<typeof Material>
}

import vine from '@vinejs/vine'

export const createReservationValidator = vine.compile(
  vine.object({
    material_id: vine.number().positive(),
    borrower_name: vine.string().trim().minLength(2).maxLength(255),
    start_date: vine.string().trim(),
    end_date: vine.string().trim(),
  })
)

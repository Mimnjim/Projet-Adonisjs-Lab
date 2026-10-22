import vine from '@vinejs/vine'

export const createReservationValidator = vine.compile(
  vine.object({
    material_id: vine.number().withoutDecimals().positive(),
    borrower_name: vine.string().trim().minLength(2).maxLength(255),
    start_date: vine.date({ formats: ['YYYY-MM-DD'] }),
    end_date: vine.date({ formats: ['YYYY-MM-DD'] }),
    quantity: vine.number().withoutDecimals().min(1).max(10000),
  })
)

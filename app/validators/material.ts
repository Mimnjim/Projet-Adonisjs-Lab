import vine from '@vinejs/vine'

export const createMaterialValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(2).maxLength(255), 
        category: vine.string().trim().minLength(2).maxLength(255),
        description: vine.string().trim().maxLength(1000).optional(),
        quantity: vine.number().withoutDecimals().min(1).max(10000),
    })
)
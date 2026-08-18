import { z } from "zod"

export const EquipeSchema = z.object({
    id: z.number().int().positive(),
    nome: z
        .string("O nome da equipe é obrigatório.")
        .trim()
        .min(2, "O nome da equipe deve ter no mínimo 2 caracteres.")
        .max(15, "O nome da equipe não pode exceder 15 caracteres."),
    cor: z
        .string("A cor da equipe é obrigatória.")
        .trim()
        .min(3, "O código de cor deve ter no mínimo 3 caracteres.")
        .max(10, "O código de cor não pode exceder 10 caracteres."),
    created_at: z.string().optional()

})

export const EquipeCriarSchema = EquipeSchema.pick({
    nome: true,
    cor: true
})

export type Equipe = z.infer<typeof EquipeSchema>
export type EquipeCriar = z.infer<typeof EquipeCriarSchema>

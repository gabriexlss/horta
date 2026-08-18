import { z } from "zod"

export const CronogramaSchema = z.object({
    id: z.number().int().positive(),
    data: z
        .string({ required_error: "A data é obrigatória." })
        .regex(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato AAAA-MM-DD."),
    tarefa: z
        .string({ required_error: "A tarefa é obrigatória." })
        .trim()
        .min(5, "A tarefa deve ter no mínimo 5 caracteres.")
        .max(2000, "A descrição da tarefa é muito longa (máximo 2000 caracteres)."),
    equipe_id: z
        .number({ required_error: "A equipe é obrigatória." })
        .int()
        .positive("Selecione uma equipe responsável válida."),
    imprevisto: z.boolean().default(false)
})

export const cronogramaCriarSchema = CronogramaSchema.pick({
    data: true,
    tarefa: true,
    equipe_id: true
})

export type cronogramaCriar = z.infer<typeof cronogramaCriarSchema>
export type CronogramaType = z.infer<typeof CronogramaSchema>


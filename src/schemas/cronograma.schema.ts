import { z } from "zod"

const CronogramaSchema = z.object({
    id: z.number().int(),
    data: z.string(),
    tarefa: z.string().min(5),
    equipe_id: z.number(),
    imprevisto: z.boolean()
})
export const cronogramaCriarSchema = CronogramaSchema.pick({
    data: true,
    tarefa: true,
    equipe_id: true
})
export type cronogramaCriar = z.infer<typeof cronogramaCriarSchema>
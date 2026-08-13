import { z } from "zod"

const AlunoSchema = z.object({
    id: z.number().int(),
    nome: z.string().min(3).max(50),
    admin: z.boolean(),
    equipe_id: z.number(),
    senha: z.string().optional()
})
export const alunoCriarSchema = AlunoSchema.pick({
    nome: true,
    admin: true,
    equipe_id: true,
    senha:true
})
export type alunoCriar = z.infer<typeof alunoCriarSchema>
import { z } from "zod"

const nomeAlunoSchema = z
    .string("O nome é obrigatório.")
    .trim()
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(50, "O nome não pode exceder 50 caracteres.")

const equipeIdSchema = z
    .number("A equipe é obrigatória.")
    .int()
    .positive("Selecione uma equipe válida.")

const senhaSchema = z
    .string("A senha é obrigatória.")
    .max(255, "A senha não pode exceder 255 caracteres.")
    .optional()

export const AlunoSchema = z.object({
    id: z.number().int().positive(),
    nome: nomeAlunoSchema,
    admin: z.boolean().default(false),
    equipe_id: equipeIdSchema,
    senha: senhaSchema
})

export const alunoCriarSchema = AlunoSchema
    .omit({ id: true })
    .refine((data) => !data.admin || Boolean(data.senha && data.senha.trim().length >= 6), {
        message: "A senha é obrigatória para administradores e deve ter no mínimo 6 caracteres.",
        path: ["senha"]
    })

export type alunoCriar = z.infer<typeof alunoCriarSchema>
export type Aluno = z.infer<typeof AlunoSchema>

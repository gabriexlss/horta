import { z } from "zod"

export const AlunoSchema = z.object({
    id: z.number().int().positive(),
    nome: z
        .string({ required_error: "O nome é obrigatório." })
        .trim()
        .min(3, "O nome deve ter no mínimo 3 caracteres.")
        .max(50, "O nome não pode exceder 50 caracteres (limite do banco)."),
    admin: z.boolean().default(false),
    equipe_id: z
        .number({ required_error: "A equipe é obrigatória." })
        .int()
        .positive("Selecione uma equipe válida."),
    senha: z
        .string()
        .max(255, "A senha não pode exceder 255 caracteres.")
        .optional()
})

export const alunoCriarSchema = z.object({
    nome: z
        .string({ required_error: "O nome é obrigatório." })
        .trim()
        .min(3, "O nome deve ter no mínimo 3 caracteres.")
        .max(50, "O nome não pode exceder 50 caracteres (limite do banco)."),
    admin: z.boolean().default(false),
    equipe_id: z
        .number({ required_error: "A equipe é obrigatória." })
        .int()
        .positive("Selecione uma equipe válida."),
    senha: z
        .string()
        .max(255, "A senha não pode exceder 255 caracteres.")
        .optional()
}).refine((data) => {
    if (data.admin) {
        return !!data.senha && data.senha.trim().length >= 6;
    }
    return true;
}, {
    message: "A senha é obrigatória para administradores e deve ter no mínimo 6 caracteres.",
    path: ["senha"]
});

export type alunoCriar = z.infer<typeof alunoCriarSchema>
export type Aluno = z.infer<typeof AlunoSchema>
import { z } from "zod"

export const PostSchema = z.object({
    id: z.number().int().positive(),
    equipe_id: z
        .number({ required_error: "A equipe é obrigatória." })
        .int()
        .positive("Selecione uma equipe responsável válida."),
    titulo: z
        .string({ required_error: "O título é obrigatório." })
        .trim()
        .min(3, "O título deve ter no mínimo 3 caracteres.")
        .max(50, "O título não pode exceder 50 caracteres (limite do banco)."),
    descricao: z
        .string({ required_error: "A descrição é obrigatória." })
        .trim()
        .min(5, "A descrição deve ter no mínimo 5 caracteres."),
    imagem_url: z.string().url("URL de imagem inválida.").optional(),
    data: z
        .string({ required_error: "A data é obrigatória." })
        .regex(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato AAAA-MM-DD."),
    imagem_file: z
        .any()
        .refine((file) => file instanceof File || (typeof file === "object" && file !== null && "size" in file), {
            message: "A foto da publicação é obrigatória."
        })
        .refine((file: any) => !file || file.size <= 5 * 1024 * 1024, {
            message: "A imagem deve ter no máximo 5MB."
        })
        .refine(
            (file: any) =>
                !file ||
                ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file?.type) ||
                file?.type?.startsWith("image/"),
            {
                message: "Apenas imagens no formato PNG, JPEG ou WebP são aceitas."
            }
        )
})

export const CriarPostSchema = z.object({
    equipe_id: z
        .number({ required_error: "A equipe é obrigatória." })
        .int()
        .positive("Selecione uma equipe responsável válida."),
    titulo: z
        .string({ required_error: "O título é obrigatório." })
        .trim()
        .min(3, "O título deve ter no mínimo 3 caracteres.")
        .max(50, "O título não pode exceder 50 caracteres (limite do banco)."),
    descricao: z
        .string({ required_error: "A descrição é obrigatória." })
        .trim()
        .min(5, "A descrição deve ter no mínimo 5 caracteres."),
    imagem_file: z
        .any()
        .refine((file) => file instanceof File || (typeof file === "object" && file !== null && "size" in file), {
            message: "A foto da publicação é obrigatória."
        })
        .refine((file: any) => !file || file.size <= 5 * 1024 * 1024, {
            message: "A imagem deve ter no máximo 5MB."
        })
        .refine(
            (file: any) =>
                !file ||
                ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file?.type) ||
                file?.type?.startsWith("image/"),
            {
                message: "Apenas imagens no formato PNG, JPEG ou WebP são aceitas."
            }
        ),
    data: z
        .string({ required_error: "A data é obrigatória." })
        .regex(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato AAAA-MM-DD.")
})

export const PegarPostSchema = PostSchema.pick({
    id: true,
    equipe_id: true,
    titulo: true,
    descricao: true,
    imagem_url: true,
    data: true
})

export type Post = z.infer<typeof PegarPostSchema>
export type CriarPost = z.infer<typeof CriarPostSchema>
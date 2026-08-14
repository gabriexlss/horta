import { z } from "zod"

const PostSchema = z.object({
    id: z.number().positive(),
    equipe_id: z.number().positive(),
    titulo: z.string().min(5).max(50),
    descricao: z.string().min(10),
    imagem_url: z.string(),
    data: z.string(),
    imagem_file: z.any()
        .refine((file) => file instanceof File, "A imagem é obrigatória.")
        .refine((file: any) => file?.size <= 5 * 1024 * 1024, "Tamanho máximo de 5MB.")
        .refine((file: any) => ["image/png", "image/jpeg", "image/webp"].includes(file?.type), "Apenas PNG, JPEG ou WebP.")
})
export const CriarPostSchema = PostSchema.pick({
    equipe_id: true,
    titulo: true,
    descricao: true,
    imagem_file: true,
    data: true
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
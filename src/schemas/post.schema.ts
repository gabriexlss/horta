import { z } from "zod"

const equipeIdSchema = z
    .number("A equipe é obrigatória.")
    .int()
    .positive("Selecione uma equipe responsável válida.")

const tituloSchema = z
    .string("O título é obrigatório.")
    .trim()
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(50, "O título não pode exceder 50 caracteres.")

const descricaoSchema = z
    .string("A descrição é obrigatória.")
    .trim()
    .min(5, "A descrição deve ter no mínimo 5 caracteres.")

const dataSchema = z.iso.date("Informe uma data válida no formato AAAA-MM-DD.")

const isFile = (value: unknown): value is File =>
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "size" in value &&
    "type" in value &&
    "arrayBuffer" in value

const imagemWebpSchema = z
    .custom<File>(isFile, "A foto da publicação é obrigatória.")
    .refine((file) => file.type === "image/webp", "A imagem processada deve estar no formato WebP.")
    .refine((file) => file.size <= 5 * 1024 * 1024, "A imagem deve ter no máximo 5MB.")

export const PostSchema = z.object({
    id: z.number().int().positive(),
    equipe_id: equipeIdSchema,
    titulo: tituloSchema,
    descricao: descricaoSchema,
    imagem_url: z.url("URL de imagem inválida."),
    data: dataSchema
})

export const CriarPostSchema = PostSchema.pick({
    equipe_id: true,
    titulo: true,
    descricao: true,
    data: true
}).extend({
    imagem_file: imagemWebpSchema
})

export const PegarPostSchema = PostSchema

export type Post = z.infer<typeof PegarPostSchema>
export type CriarPost = z.infer<typeof CriarPostSchema>

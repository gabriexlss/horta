import { z } from "zod"

const PostSchema = z.object({
    id: z.number().positive(),
    equipe_id: z.number().positive(),
    titulo: z.string().min(5).max(50),
    descricao: z.string().min(10),
    imagem_url: z.string()
})
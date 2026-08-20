import { pool } from "@/lib/db"
import { Equipe } from "@/schemas/equipe.schema"
import { Aluno } from "@/schemas/aluno.schema"
import { Cronograma } from "@/schemas/cronograma.schema"
import { Post } from "@/schemas/post.schema";

export const get = {
    equipes: async (): Promise<Equipe[]> => {
        const query = "SELECT * FROM equipes ORDER BY id ASC"
        const { rows } = await pool.query(query)
        return rows
    },
    alunos: async (): Promise<Aluno[]> => {
        const query = "SELECT id, nome, admin, equipe_id FROM alunos ORDER BY nome ASC"
        const { rows } = await pool.query(query)
        return rows
    },
    cronogramas: async (): Promise<Cronograma[]> => {
        const query = "SELECT * FROM cronogramas ORDER BY id ASC"
        const { rows } = await pool.query(query)
        return rows
    },
    posts: async (): Promise<Post[]> => {
        const query = "SELECT * FROM posts ORDER BY data ASC"
        const { rows } = await pool.query(query)
        return rows
    }

}
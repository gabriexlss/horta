import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { pool } from "@/lib/db"
import { cronogramaCriarSchema } from "@/schemas/cronograma.schema"

interface ErroPostgres {
    code?: string
}

const ehErroPostgres = (erro: unknown): erro is ErroPostgres =>
    typeof erro === "object" && erro !== null && "code" in erro

export async function POST(req:NextRequest) {
    const res = NextResponse
    try{
        const body = await req.json()
        const dadosValidados  = cronogramaCriarSchema.safeParse(body)

        if(!dadosValidados.success){
            const primeiroErro = dadosValidados.error.issues[0]?.message || "Dados inválidos."
            return res.json({msg: primeiroErro, erro: dadosValidados.error.format()},{status: 400})
        }
        const { equipe_id, data, tarefa } = dadosValidados.data


        const query = `
            INSERT INTO cronogramas (data, equipe_id, tarefa)
            VALUES ($1::date, $2, $3)
            RETURNING id, data, equipe_id, tarefa, imprevisto
        `
        const valores: (string | number | Date)[] = [data, equipe_id, tarefa]

        const cronogramaCriado = await pool.query(query, valores)
        revalidatePath("/cronograma")

        return res.json({msg: "Cronograma Criado com Sucesso.", cronograma: cronogramaCriado.rows[0]}, {status: 201})
    }catch(erro){
        // 23505 é o código do PostgreSQL para violação de campo UNIQUE.
        if(ehErroPostgres(erro) && erro.code === "23505"){
            return res.json({msg: "Já existe uma tarefa cadastrada para este dia."},{status: 409})
        }

        console.error("erro no endpoint de criação de cronograma, erro: ", erro)
        return res.json({msg: "Erro Interno do servidor."},{status: 500})
    }
}

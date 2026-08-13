import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { cronogramaCriarSchema } from "@/schemas/cronograma.schema"

export async function POST(req:NextRequest) {
    const res = NextResponse
    try{
        const body = await req.json()
        const dadosValidados  = cronogramaCriarSchema.safeParse(body)

        if(!dadosValidados.success){
            return res.json({msg: "Dados Invalidos.", erro: dadosValidados.error.format()},{status: 400})
        }
        const { equipe_id, data, tarefa } = dadosValidados.data

        const query = `INSERT INTO cronogramas (data, equipe_id, tarefa) VALUES ($1, $2, $3)`
        const valores: (string | number | Date)[] = [data, equipe_id, tarefa]

        await pool.query(query, valores)
        return res.json({msg: "Cronograma Criado com Sucesso."}, {status: 201})
    }catch(erro){
        console.error("erro no endpoint de criação de cronograma, erro: ", erro)
        return res.json({msg: "Erro Interno do servidor."},{status: 500})
    }
}

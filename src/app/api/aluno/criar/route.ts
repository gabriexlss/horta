import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { alunoCriarSchema } from "@/schemas/aluno.schema"

export async function POST(req:NextRequest) {
    const res = NextResponse
    try{
        const body = await req.json()
        const dadosValidados  = alunoCriarSchema.safeParse(body)

        if(!dadosValidados.success){
            return res.json({msg: "Dados Invalidos.", erro: dadosValidados.error.format()},{status: 400})
        }
        const { nome, admin, equipe_id, senha } = dadosValidados.data

        if(admin && !senha){
            return res.json({msg: "A Senha tem que ser inserida para admnistradores"},{status: 400})
        }
        const query = `INSERT INTO alunos (nome, equipe_id ${admin && senha ? ' admin, senha': ''}) VALUES ($1, $2 ${admin && senha ? ' $3, $4': ''})`
        const valores: (string | number | boolean)[] = [nome, equipe_id]
        if(admin && senha){
            valores.push(admin, senha)
        }
        await pool.query(query, valores)
        return res.json({msg: "Aluno Criado com Sucesso."}, {status: 201})
    }catch(erro){
        console.error("erro no endpoint de criação de  aluno, erro: ", erro)
        return res.json({msg: "Erro Interno do servidor."},{status: 500})
    }
}
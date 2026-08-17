import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { revalidatePath } from "next/cache";

interface RouteParams {
  params: Promise<{ id: string }>; // No Next.js 15+ os params são uma Promise
}

// Rota para deletar
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    const res = NextResponse  
    try{
        const { id } = await params

        // verifica se veio id
        if(!id){
            return res.json({msg: "id do cronograma é necessario para deletar"},{status:400})
        }

        // com esse id, verifica se acha alguma coluna no banco de dados
        const searchQuery = "SELECT * FROM cronogramas WHERE id = $1"
        const dados = await pool.query(searchQuery, [id])
        if(dados.rowCount === 0){
            return res.json({msg: "Nenhum cronograma encontrado com o id fornecido."},{status:404})
        }

        // realiza a operação
        const query = "DELETE FROM cronogramas WHERE id = $1"
        await pool.query(query,[id])

        // revalida cache e manda embora
        revalidatePath('/admin/cronogramas')
        revalidatePath('/cronogramas')  
        return res.json({msg: "Cronograma Deletado com Sucesso."},{status:200})
    }catch(erro){
        console.error("erro no endpoint de deletar cronograma, erro: ", erro)
        return res.json({msg: "Erro Interno do Servidor"},{status:500})
    }
}

//  rota pra marcar que o cronograma teve imprevisto
export async function PATCH(req: NextRequest, { params }: RouteParams) {
    const res = NextResponse  
    try{
        const { id } = await params

        // verifica se veio id
        if(!id){
            return res.json({msg: "id do cronograma é necessario para deletar"},{status:400})
        }

        // com esse id, verifica se acha alguma coluna no banco de dados
        const searchQuery = "SELECT * FROM cronogramas WHERE id = $1"
        const dados = await pool.query(searchQuery, [id])
        if(dados.rowCount === 0){
            return res.json({msg: "Nenhum cronograma encontrado com o id fornecido."},{status:404})
        }

        // realiza a operação
        const query = "UPDATE cronogramas SET imprevisto = true WHERE id = $1"
        await pool.query(query,[id])

        // revalida cache e manda embora
        revalidatePath('/admin/cronogramas')
        revalidatePath('/cronograma')  
        return res.json({msg: "Imprevisto no Cronograma Registrado."},{status:200})
    }catch(erro){
        console.error("erro no endpoint de registrar imprevisto, erro: ", erro)
        return res.json({msg: "Erro Interno do Servidor"},{status:500})
    }
}
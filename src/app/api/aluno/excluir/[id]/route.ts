import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { revalidatePath } from "next/cache";
import { getAuthenticatedAdminFromRequest } from "@/lib/auth"

interface RouteParams {
  params: Promise<{ id: string }>; // No Next.js 15+ os params são uma Promise
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
    const res = NextResponse
    try{
        if (!await getAuthenticatedAdminFromRequest(req)) {
            return res.json({msg: "Não autorizado."}, {status: 401})
        }

        const { id } = await params

        if(!id){
            return res.json({msg: "id é necessario para deletar"},{status:400})
        }

        const query = "DELETE from alunos WHERE id = $1"
        revalidatePath('/admin/alunos')
        await pool.query(query,[id])
        return res.json({msg: "Usúario Deletado com Sucesso."},{status:200})
    }catch(erro){
        console.error("erro no endpoint de deletar aluno, erro: ", erro)
        return res.json({msg: "Erro Interno do Servidor"},{status:500})
    }
}

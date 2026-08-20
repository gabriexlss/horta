import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedAdminFromRequest } from "@/lib/auth"
import { pool } from "@/lib/db"
import { transferirAlunoSchema } from "@/schemas/aluno.schema"

interface RouteParams {
    params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        if (!await getAuthenticatedAdminFromRequest(request)) {
            return NextResponse.json({ msg: "Não autorizado." }, { status: 401 })
        }

        const { id } = await params
        const alunoId = Number(id)
        const body: unknown = await request.json()
        const dadosValidados = transferirAlunoSchema.safeParse(body)

        if (!Number.isSafeInteger(alunoId) || alunoId <= 0 || !dadosValidados.success) {
            return NextResponse.json({ msg: "Aluno ou equipe inválidos." }, { status: 400 })
        }

        const { equipe_id } = dadosValidados.data
        const equipe = await pool.query("SELECT 1 FROM equipes WHERE id = $1 LIMIT 1", [equipe_id])

        if (equipe.rowCount === 0) {
            return NextResponse.json({ msg: "Equipe de destino não encontrada." }, { status: 404 })
        }

        const resultado = await pool.query(
            "UPDATE alunos SET equipe_id = $1 WHERE id = $2 RETURNING id",
            [equipe_id, alunoId]
        )

        if (resultado.rowCount === 0) {
            return NextResponse.json({ msg: "Aluno não encontrado." }, { status: 404 })
        }

        revalidatePath("/admin/equipes")
        revalidatePath("/admin/alunos")
        return NextResponse.json({ msg: "Aluno transferido com sucesso." })
    } catch (error) {
        console.error("Erro ao transferir aluno:", error)
        return NextResponse.json({ msg: "Erro interno do servidor." }, { status: 500 })
    }
}

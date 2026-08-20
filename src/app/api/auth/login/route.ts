import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { pool } from "@/lib/db"
import {
    createAdminToken,
    SESSION_COOKIE_NAME,
    SESSION_DURATION_SECONDS,
} from "@/lib/session"

const loginSchema = z.object({
    alunoId: z.number().int().positive(),
    senha: z.string().min(1).max(255),
})

interface AdminRow {
    id: number
    senha: string | null
}

export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json()
        const parsed = loginSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json({ msg: "Selecione um administrador e informe a senha." }, { status: 400 })
        }

        const { alunoId, senha } = parsed.data
        const { rows } = await pool.query<AdminRow>(
            "SELECT id, senha FROM alunos WHERE id = $1 AND admin = true LIMIT 1",
            [alunoId]
        )
        const admin = rows[0]
        const senhaCorreta = admin?.senha ? await bcrypt.compare(senha, admin.senha) : false

        if (!admin || !senhaCorreta) {
            return NextResponse.json({ msg: "Aluno ou senha inválidos." }, { status: 401 })
        }

        const token = await createAdminToken(admin.id)
        const response = NextResponse.json({ msg: "Login realizado com sucesso." })

        response.cookies.set(SESSION_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: SESSION_DURATION_SECONDS,
            priority: "high",
        })
        response.headers.set("Cache-Control", "no-store")

        return response
    } catch (error) {
        console.error("Erro no login do administrador:", error)
        return NextResponse.json({ msg: "Erro interno do servidor." }, { status: 500 })
    }
}

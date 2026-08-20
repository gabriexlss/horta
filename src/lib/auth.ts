import type { NextRequest } from "next/server"
import { cookies } from "next/headers"
import { pool } from "@/lib/db"
import { SESSION_COOKIE_NAME, verifyAdminToken } from "@/lib/session"

async function adminAindaExiste(adminId: number) {
    const { rowCount } = await pool.query(
        "SELECT 1 FROM alunos WHERE id = $1 AND admin = true LIMIT 1",
        [adminId]
    )

    return rowCount === 1
}

export async function getAuthenticatedAdminFromRequest(request: NextRequest) {
    const session = await verifyAdminToken(request.cookies.get(SESSION_COOKIE_NAME)?.value)

    if (!session || !(await adminAindaExiste(session.adminId))) return null
    return session
}

export async function getAuthenticatedAdmin() {
    const cookieStore = await cookies()
    const session = await verifyAdminToken(cookieStore.get(SESSION_COOKIE_NAME)?.value)

    if (!session || !(await adminAindaExiste(session.adminId))) return null
    return session
}

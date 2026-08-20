import { jwtVerify, SignJWT } from "jose"

export const SESSION_COOKIE_NAME = "horta_admin_session"
export const SESSION_DURATION_SECONDS = 8 * 60 * 60

export interface AdminSession {
    adminId: number
}

function getJwtSecret() {
    const secret = process.env.JWT_SECRET

    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET deve ter pelo menos 32 caracteres.")
    }

    return new TextEncoder().encode(secret)
}

export async function createAdminToken(adminId: number) {
    return new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setSubject(String(adminId))
        .setIssuedAt()
        .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
        .sign(getJwtSecret())
}

export async function verifyAdminToken(token?: string): Promise<AdminSession | null> {
    if (!token) return null

    try {
        const { payload } = await jwtVerify(token, getJwtSecret(), {
            algorithms: ["HS256"],
        })
        const adminId = Number(payload.sub)

        if (payload.role !== "admin" || !Number.isSafeInteger(adminId) || adminId <= 0) {
            return null
        }

        return { adminId }
    } catch {
        return null
    }
}

import Navegacao from "./Navegacao"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAuthenticatedAdmin()

    if (!session) redirect("/login")

    return (
        <main>
            <Navegacao />
            {children}
        </main>
    );
}

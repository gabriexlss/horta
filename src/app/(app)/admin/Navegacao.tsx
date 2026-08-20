'use client'
import styles from "./admin.module.css"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const Navegacao = () => {
    const pathname = usePathname()
    const router = useRouter()

    async function sair() {
        await fetch("/api/auth/logout", { method: "POST" })
        router.replace("/login")
        router.refresh()
    }

    return (
        <nav className={styles.navegacao}>
            <Link href={"/admin/cronogramas"} className={`${styles.link} ${pathname == "/admin/cronogramas" ? styles.selected : ""}`} >Gestão de Cronograma</Link>
            <Link href={"/admin/equipes"} className={`${styles.link} ${pathname == "/admin/equipes" ? styles.selected : ""}`} >Gestão de Equipes</Link>
            <Link href={"/admin/posts"} className={`${styles.link} ${pathname == "/admin/posts" ? styles.selected : ""}`} >Gestão de Posts</Link>
            <Link href={"/admin/alunos"} className={`${styles.link} ${pathname == "/admin/alunos" ? styles.selected : ""}`} >Gestão de Alunos</Link>
            <button type="button" className={`${styles.link} ${styles.logout}`} onClick={sair}>Sair</button>
        </nav>
    )
}

export default Navegacao

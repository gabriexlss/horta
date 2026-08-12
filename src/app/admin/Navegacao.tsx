'use client'
import styles from "./admin.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navegacao = () => {
    const pathname = usePathname()
    return (
        <nav className={styles.navegacao}>
            <Link href={"/admin/cronogramas"} className={`${styles.link} ${pathname == "/admin/cronogramas" ? styles.selected : ""}`} >Gestão de Cronograma</Link>
            <Link href={"/admin/equipes"} className={`${styles.link} ${pathname == "/admin/equipes" ? styles.selected : ""}`} >Gestão de Equipes</Link>
            <Link href={"/admin/posts"} className={`${styles.link} ${pathname == "/admin/posts" ? styles.selected : ""}`} >Gestão de Posts</Link>
            <Link href={"/admin/alunos"} className={`${styles.link} ${pathname == "/admin/alunos" ? styles.selected : ""}`} >Gestão de Alunos</Link>
        </nav>
    )
}

export default Navegacao
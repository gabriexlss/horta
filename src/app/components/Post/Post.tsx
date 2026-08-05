'use client'
import styles from "./Post.module.css";
import Image from "next/image"
import { useRouter } from "next/navigation"

interface postProps{
    titulo: string,
    corpo: string,
    data: Date,
    link: string,
    imagem: string
}
const Post = ({titulo, corpo, data, link, imagem}: postProps) => {
    const router = useRouter()

    const navegar = () => {
        router.push(link)
    }
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(data)
    return (
        <section className={styles.post} onClick={navegar}>
            <header>
                <Image src={imagem} alt={titulo} fill className={styles.imagem}/>
            </header>
            <span>
                <div className={styles.data}>{`${dataFormatada}`}</div>
                <h3 className={styles.titulo}>{titulo}</h3>
                <p className={styles.corpo}>{corpo}</p>
            </span>
        </section>
    )
}

export default Post
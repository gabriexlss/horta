import { pool } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Image from "next/image"
import styles from "./PostPage.module.css"
import { Post } from "@/schemas/post.schema"
import { MdArticle, MdCalendarMonth } from "react-icons/md"

async function Page({ params, }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        redirect('/')
    }
    const query = "SELECT id, equipe_id, titulo, descricao, data, imagem_url FROM posts WHERE id = $1"
    const postDados = await pool.query(query, [id])

    if (postDados.rowCount === 0) {
        notFound()
    }
    const post: Post[] = postDados.rows
    const { titulo, descricao, imagem_url, data, equipe_id } = post[0]

    const queryEquipe = "SELECT nome, cor FROM equipes WHERE id = $1"
    const equipeDados = await pool.query(queryEquipe, [equipe_id])

    const { nome, cor } = equipeDados.rows[0]

    const datatipoData = new Date(data)
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(datatipoData)

    return (
        <main className={styles.principal}>
            <div className={styles.imagem}>
                <Image src={imagem_url} alt={titulo} fill />
            </div>
            <section className={styles.cabecalho}>
                <header>
                    <h1>{titulo}</h1>
                    <div className={styles.dia}>
                        <MdCalendarMonth className={styles.diaIcone} />
                        <h3>{String(dataFormatada)}</h3>
                    </div>
                </header>
                <footer>
                    <div className={styles.footerTitulo}>
                        {"Equipe Responsável: "}
                    </div>
                    <div style={{ backgroundColor: cor }} className={styles.footerEquipe}>
                        {`Equipe ${nome}`}
                    </div>
                </footer>
            </section>
            <article className={styles.corpo}>
                <div className={styles.corpoTitulo}>
                    <MdArticle className={styles.corpoIcone} />
                    <h2>Descrição</h2>
                </div>
                <div className={styles.texto}>
                    {descricao}
                </div>
            </article>
        </main>
    )
}

export default Page
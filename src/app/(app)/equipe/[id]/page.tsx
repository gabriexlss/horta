import Link from "next/link"
import { notFound } from "next/navigation"
import { MdArrowBack, MdGroups, MdPerson } from "react-icons/md"
import { pool } from "@/lib/db"
import styles from "./EquipePage.module.css"

interface EquipeRow {
    id: number
    nome: string
    cor: string
}

interface AlunoRow {
    id: number
    nome: string
}

export default async function EquipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const equipeId = Number(id)

    if (!Number.isSafeInteger(equipeId) || equipeId <= 0) notFound()

    const equipeResult = await pool.query<EquipeRow>(
        "SELECT id, nome, cor FROM equipes WHERE id = $1 LIMIT 1",
        [equipeId]
    )
    const equipe = equipeResult.rows[0]

    if (!equipe) notFound()

    const alunosResult = await pool.query<AlunoRow>(
        "SELECT id, nome FROM alunos WHERE equipe_id = $1 ORDER BY nome ASC",
        [equipeId]
    )
    const alunos = alunosResult.rows

    return (
        <main className={styles.pagina}>
            <Link href="/" className={styles.voltar}>
                <MdArrowBack aria-hidden="true" />
                Voltar para o início
            </Link>

            <section className={styles.hero} style={{ borderTopColor: equipe.cor }}>
                <div className={styles.iconeEquipe} style={{ backgroundColor: equipe.cor }}>
                    <MdGroups aria-hidden="true" />
                </div>
                <div>
                    <h1>Equipe {equipe.nome}</h1>
                    <p className={styles.resumo}>
                        {alunos.length === 1 ? "1 membro participa desta equipe." : `${alunos.length} membros participam desta equipe.`}
                    </p>
                </div>
            </section>

            <section className={styles.membros} aria-labelledby="titulo-membros">
                <header>
                    <div>
                        <h2 id="titulo-membros">Membros</h2>
                    </div>
                    <span className={styles.contador}>{alunos.length}</span>
                </header>

                {alunos.length > 0 ? (
                    <div className={styles.lista}>
                        {alunos.map((aluno) => (
                            <article className={styles.membro} key={aluno.id}>
                                <div className={styles.avatar} style={{ backgroundColor: equipe.cor }} aria-hidden="true">
                                    {aluno.nome.trim().charAt(0).toUpperCase() || <MdPerson />}
                                </div>
                                <div>
                                    <h3>{aluno.nome}</h3>
                                    <p>Membro da equipe</p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className={styles.vazio}>
                        <MdPerson aria-hidden="true" />
                        <h3>Nenhum membro por aqui ainda</h3>
                        <p>Os alunos transferidos para esta equipe aparecerão nesta página.</p>
                    </div>
                )}
            </section>
        </main>
    )
}

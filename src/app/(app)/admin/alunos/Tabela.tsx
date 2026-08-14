'use client'
import styles from "../admin.module.css"
import { MdDelete, MdAdd } from "react-icons/md"
import { useState } from "react"
import Adicionar from "@/components/pop-up/adicionar-aluno/Adicionar.Aluno"
import RemoverAluno from "@/components/pop-up/remover-aluno/Remover.Aluno"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"
import { aluno, membroEquipe } from "@/schemas/interfacesGlobais"

interface tabelaProps {
    alunos: aluno[],
    equipe: membroEquipe[]
}

const Tabela = ({ alunos, equipe }: tabelaProps) => {
    const [showAddAluno, setShowAddAluno] = useState(false);
    const [alunoParaRemover, setAlunoParaRemover] = useState<aluno | null>(null)
    const router = useRouter()

    const deletarAluno = async (id: number) => {
        if (!id) return

        try {
            const response = await fetch(`/api/aluno/excluir/${String(id)}`, {
                method: 'delete'
            })
            const resposta = await response.json()
            if (!response.ok) {
                notify.erro(resposta.msg)
            } else if(response.ok){
                notify.sucesso(resposta.msg)
            }
        } catch {
            notify.erro("Erro desconhecido ao deleter Aluno")
        } finally {
            router.refresh()
            setAlunoParaRemover(null)
        }
    }
    return (
        <div>
            <section aria-label="Lista de alunos" className={styles.listaAlunos}>
                <header className={styles.cabecalhoAlunos}>
                    <span>Nome</span>
                    <span>Cargo</span>
                    <span className={styles.acoes}>Ações</span>
                </header>
                {alunos && alunos.length > 0 ? (
                    alunos.map((aluno) => (
                        <article className={styles.linhaAluno} key={aluno.id}>
                            <strong className={styles.nomeAluno}>{aluno.nome}</strong>
                            <span className={`${styles.cargo} ${aluno.admin ? styles.cargoAdmin : styles.cargoComum}`}>
                                {aluno.admin ? "Admin" : "Aluno"}
                            </span>
                            <button
                                aria-label={`Excluir ${aluno.nome}`}
                                className={styles.remove}
                                onClick={() => setAlunoParaRemover(aluno)}
                                type="button"
                            >
                                <MdDelete />
                            </button>
                        </article>
                    ))
                ) : (
                    <p className={styles.listaVazia}>Nenhum aluno cadastrado ainda.</p>
                )}
            </section>
            <button
                aria-label="Adicionar Aluno"
                className={styles.addMore}
                onClick={() => setShowAddAluno(true)}
            >
                <MdAdd />
            </button>
            {showAddAluno && <Adicionar equipes={equipe} showAddAluno={showAddAluno} closeShowAddAluno={() => setShowAddAluno(false)} />}
            {alunoParaRemover && (
                <RemoverAluno
                    alunoNome={alunoParaRemover.nome}
                    onCancelar={() => setAlunoParaRemover(null)}
                    onConfirmar={() => deletarAluno(alunoParaRemover.id)}
                />
            )}
        </div>
    )
}

export default Tabela

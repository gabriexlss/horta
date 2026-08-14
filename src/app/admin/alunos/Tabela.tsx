'use client'
import styles from "../admin.module.css"
import { MdDelete, MdEdit, MdAdd } from "react-icons/md"
import { useState } from "react"
import Adicionar from "@/app/components/pop-up/adicionar-aluno/Adicionar.Aluno"
import RemoverAluno from "@/app/components/pop-up/remover-aluno/Remover.Aluno"
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
            <table className={styles.Tabela}>
                <thead>
                    <tr>
                        <th className={styles.TabelaNome}>Nome</th>
                        <th className={styles.TabelaCargo}>Cargo</th>
                        <th colSpan={2} className={styles.TabelaAcoes}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alunos && alunos.length > 0 ?
                            alunos.map(a => (
                                <tr key={a.id}>
                                    <td>{a.nome}</td>
                                    <td className={styles.Cargo}>{a.admin === true ? "admin" : "comum"}</td>
                                    <td>
                                        <button
                                            aria-label={`Excluir ${a.nome}`}
                                            className={styles.remove}
                                            onClick={() => setAlunoParaRemover(a)}
                                            type="button"
                                        >
                                            <MdDelete className={styles.TabelaIcon} />
                                        </button>
                                    </td>
                                    <td><MdEdit className={styles.TabelaIcon} /></td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={4}>Nenhum Aluno Cadastrado Ainda</td>
                            </tr>
                    }

                </tbody>
            </table>
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

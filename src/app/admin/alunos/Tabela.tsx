'use client'
import styles from "../admin.module.css"
import { MdDelete, MdEdit, MdAdd } from "react-icons/md"
import { useState } from "react"
import Adicionar from "@/app/components/pop-up/Adicionar.Aluno"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"

interface membroEquipe {
    id: number,
    nome: string,
    cor: string
}
interface aluno {
    nome: string,
    id: number,
    admin: boolean
}
interface tabelaProps {
    alunos: aluno[],
    equipe: membroEquipe[]
}

const Tabela = ({ alunos, equipe }: tabelaProps) => {
    const [showAddAluno, setShowAddAluno] = useState(false);
    const router = useRouter()

    const deletarAluno = async (id:number) => {
        if(!id) return

        const response = await fetch(`/api/aluno/excluir/${String(id)}`,{
            method: 'delete'
        })

        if(!response.ok){
            notify.erro("Erro ao Deleter Aluno")
        }else{
            notify.sucesso("Aluno Deletado com sucesso")
        }
        router.push('/admin/alunos')
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
                                    <td onClick={() => deletarAluno(a.id)}><MdDelete className={styles.TabelaIcon} /></td>
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
        </div>
    )
}

export default Tabela
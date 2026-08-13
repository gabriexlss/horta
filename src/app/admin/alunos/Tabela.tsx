'use client'
import styles from "../admin.module.css"
import { MdDelete, MdEdit } from "react-icons/md"
interface aluno {
    nome: string,
    id: number,
    admin: boolean
}
interface tabelaProps {
    alunos: aluno[]
}

const Tabela = ({ alunos }: tabelaProps) => {
    return (
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
                                <td><MdDelete className={styles.TabelaIcon} /></td>
                                <td><MdEdit className={styles.TabelaIcon} /></td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={5}>Nenhum Aluno Cadastrado Ainda</td>
                        </tr>
                }

            </tbody>
        </table>
    )
}

export default Tabela
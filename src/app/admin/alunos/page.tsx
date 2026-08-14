'use client'
import styles from "../admin.module.css"
import { MdDelete, MdEdit, MdAdd } from "react-icons/md"
import { useState } from "react"
import { Adicionar, Remover } from "@/app/components/pop-up/page"

function Alunos() {
  const [showAddAluno, setShowAddAluno] = useState(false);
  const [showRmvAluno, setShowRmvAluno] = useState(false);
  return (
    <section>
      <table className={styles.Tabela}>
        <thead>
          <tr>
            <th className={styles.TabelaNome}>Nome</th>
            <th className={styles.TabelaCargo}>Cargo</th>
            <th colSpan={2} className={styles.TabelaAcoes}>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gabriel</td>
            <td className={styles.Cargo}>Comum</td>
            <td><button className={styles.remove} onClick={() => setShowRmvAluno(true)}><MdDelete className={styles.TabelaIcon} /></button></td>
            <td><MdEdit className={styles.TabelaIcon} /></td>
          </tr>
        </tbody>
      </table>
      <button
        aria-label="Adicionar Aluno"
        className={styles.addMore}
        onClick={() => setShowAddAluno(true)}
      >
        <MdAdd />
      </button>
      {showAddAluno && <Adicionar showAddAluno={showAddAluno} closeShowAddAluno={() => setShowAddAluno(false)} />}
      {showRmvAluno && <Remover showRmvAluno={showRmvAluno} closeShowRmvAluno={() => setShowRmvAluno(false)} />}
    </section>
  )
}

export default Alunos
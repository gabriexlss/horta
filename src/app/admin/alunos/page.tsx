'use client'
import styles from "../admin.module.css"
import { MdDelete, MdEdit, MdAdd } from "react-icons/md"

function Alunos() {
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
          <td><MdDelete className={styles.TabelaIcon}/></td>
          <td><MdEdit className={styles.TabelaIcon}/></td>
        </tr>
        </tbody>
      </table>
      <button className={styles.addMore}><MdAdd/></button>
    </section>
  )
}

export default Alunos
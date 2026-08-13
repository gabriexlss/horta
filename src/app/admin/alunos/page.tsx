import Tabela from "./Tabela"
import styles from "../admin.module.css"
import { MdAdd } from "react-icons/md"
import { pool } from "@/lib/db"

async function Alunos() {
  const query = "SELECT id, nome, admin FROM alunos ORDER BY id ASC"
  const alunos = await pool.query(query)
  return (
    <section>
      <Tabela alunos={alunos.rows}/>
      <button className={styles.addMore}><MdAdd /></button>
    </section>
  )
}

export default Alunos
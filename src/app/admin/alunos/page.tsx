import Tabela from "./Tabela"
import { pool } from "@/lib/db"

async function Alunos() {
  const queryEquipes = "SELECT * FROM equipes ORDER BY id ASC"
  const equipes = await pool.query(queryEquipes)

  const query = "SELECT id, nome, admin FROM alunos ORDER BY id ASC"
  const alunos = await pool.query(query)
  return (
    <section>
      <Tabela alunos={alunos.rows} equipe={equipes.rows}/>
    </section>
  )
}

export default Alunos
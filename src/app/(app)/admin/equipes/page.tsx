'use server'
import Equipe from "./equipe"
import { pool } from "@/lib/db"

async function Equipes() {
  const queryEquipes = "SELECT * FROM equipes ORDER BY id ASC"
  const equipes = await pool.query(queryEquipes)

  const queryAlunos = "SELECT id, nome, equipe_id FROM alunos ORDER BY id ASC"
  const alunos = await pool.query(queryAlunos)
  return (
    <section>
      <Equipe equipe={equipes.rows} aluno={alunos.rows} />
    </section>
  )
}

export default Equipes
import Formulario from "./Formulario"
import { pool } from "@/lib/db"

async function Posts() {
  const queryEquipes = "SELECT * FROM equipes ORDER BY id ASC"
  const equipes = await pool.query(queryEquipes)

  return (
    <section>
      <Formulario equipes={equipes.rows}/>
    </section>
  )
}

export default Posts
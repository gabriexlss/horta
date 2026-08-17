import Formulario from "./Formulario"
import Actions from "./actions"
import { pool } from "@/lib/db"

async function Posts() {
  const queryEquipes = "SELECT * FROM equipes ORDER BY id ASC"
  const equipes = await pool.query(queryEquipes)

  return (
    <section>
      <Formulario equipes={equipes.rows}/>
      <Actions />
    </section>
  )
}

export default Posts
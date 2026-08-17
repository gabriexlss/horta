import CronogramaForm from "./cronograma"
import Actions from "./actions"
import { pool } from "@/lib/db"

async function Cronograma() {
  const queryEquipes = "SELECT * FROM equipes ORDER BY id ASC"
  const equipes = await pool.query(queryEquipes)
  
  return (
    <section>
      <CronogramaForm equipes={equipes.rows}/>
      <Actions />
    </section>
  )
}

export default Cronograma
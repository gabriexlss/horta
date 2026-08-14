import CronogramaForm from "./cronograma"
import { pool } from "@/lib/db"

async function Cronograma() {
  const queryEquipes = "SELECT * FROM equipes ORDER BY id ASC"
  const equipes = await pool.query(queryEquipes)
  
  return (
    <section>
      <CronogramaForm equipes={equipes.rows}/>
    </section>
  )
}

export default Cronograma
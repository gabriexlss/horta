import Calendario from "./Calendario"
import { pool }  from "@/lib/db"

export const dynamic = "force-dynamic"

async function Cronograma() {
  const queryEquipes = "SELECT * FROM equipes ORDER BY id ASC"
  const equipes = await pool.query(queryEquipes)

  const queryCronograma = "SELECT id, data, tarefa, equipe_id, imprevisto FROM cronogramas"
  const cronogramas = await pool.query(queryCronograma)

  return (
    <main>
      <Calendario equipes={equipes.rows} cronogramas={cronogramas.rows}/>
    </main>
  )
}

export default Cronograma

import { get } from "@/services/get";
import Calendario from "./Calendario"

export const dynamic = "force-dynamic"

async function Cronograma() {
  const [equipes, cronogramas] = await Promise.all([
    get.equipes(),
    get.cronogramas()
  ])

  return (
    <main>
      <Calendario equipes={equipes} cronogramas={cronogramas}/>
    </main>
  )
}

export default Cronograma

import CronogramaForm from "./cronograma"
import Actions from "./actions"
import { get } from "@/services/get"

async function Cronograma() {
  const [equipes, cronogramas] = await Promise.all([
    get.equipes(),
    get.cronogramas()
  ])
  
  return (
    <section>
      <CronogramaForm equipes={equipes}/>
      <Actions cronogramas={cronogramas}/>
    </section>
  )
}

export default Cronograma
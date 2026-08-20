import Tabela from "./Tabela"
import { get } from "@/services/get"

async function Alunos() {
  const [equipes, alunos] = await Promise.all([
    get.equipes(),
    get.alunos()
  ])
  return (
    <section>
      <Tabela alunos={alunos} equipe={equipes} />
    </section>
  )
}

export default Alunos
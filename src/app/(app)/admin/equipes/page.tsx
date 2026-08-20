'use server'
import Equipe from "./equipe"
import { get } from "@/services/get"

async function Equipes() {
  const [equipes, alunos] = await Promise.all([
    get.equipes(),
    get.alunos()
  ])
  return (
    <section>
      <Equipe equipe={equipes} aluno={alunos} />
    </section>
  )
}

export default Equipes
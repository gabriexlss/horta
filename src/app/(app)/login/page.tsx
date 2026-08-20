'use server'
import { get } from "@/services/get";
import Equipe from "./login"
import { connection } from "next/server"

async function Equipes() {
  await connection()

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

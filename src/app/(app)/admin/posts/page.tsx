import { get } from "@/services/get";
import Formulario from "./Formulario"
import Actions from "./actions"

async function Posts() {
  const [equipes, posts] = await Promise.all([
    get.equipes(),
    get.posts()
  ])

  return (
    <section>
      <Formulario equipes={equipes}/>
      <Actions posts={posts} equipes={equipes}/>
    </section>
  )
}

export default Posts

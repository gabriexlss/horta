import Post from "@/components/Post/Post"
interface post{
    id: number,
    titulo: string,
    descricao: string,
    imagem_url: string,
    data: string,
    equipe_id: number
}
interface PostsProps{
    post: post[]
}

const Posts = ({post}: PostsProps) => {
    const postsAjustados = post.toSorted(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
  )
    return (
        <section>
            {postsAjustados.map(post => (
                <Post titulo={post.titulo} corpo={post.descricao} imagem={post.imagem_url} data={post.data} link={`/post/${post.id}`} key={post.id} />
            ))}
        </section>
    )
}

export default Posts
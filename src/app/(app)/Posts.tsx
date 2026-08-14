import Post from "@/components/Post/Post"
interface post{
    id: number,
    titulo: string,
    descricao: string,
    imagem_url: string,
    data: Date,
    equipe_id: number
}
interface PostsProps{
    post: post[]
}

const Posts = ({post}: PostsProps) => {
    return (
        <section>
            {post.map(post => (
                <Post titulo={post.titulo} corpo={post.descricao} imagem={post.imagem_url} data={post.data} link={`/post/${post.id}`} key={post.id} />
            ))}
        </section>
    )
}

export default Posts
import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { revalidatePath } from "next/cache";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2, BUCKET_NAME } from "@/lib/r2"
import { getAuthenticatedAdminFromRequest } from "@/lib/auth"
import { EditarPostSchema } from "@/schemas/post.schema"

interface RouteParams {
  params: Promise<{ id: string }>; // No Next.js 15+ os params são uma Promise
}
interface dadosBanco{
    imagem_url: string
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        if (!await getAuthenticatedAdminFromRequest(req)) {
            return NextResponse.json({ msg: "Não autorizado." }, { status: 401 })
        }

        const { id } = await params
        const postId = Number(id)
        const body: unknown = await req.json()
        const dadosValidados = EditarPostSchema.safeParse(body)

        if (!Number.isSafeInteger(postId) || postId <= 0) {
            return NextResponse.json({ msg: "Post inválido." }, { status: 400 })
        }

        if (!dadosValidados.success) {
            const primeiroErro = dadosValidados.error.issues[0]?.message || "Dados inválidos."
            return NextResponse.json({ msg: primeiroErro }, { status: 400 })
        }

        const { equipe_id, titulo, descricao } = dadosValidados.data
        const equipe = await pool.query("SELECT 1 FROM equipes WHERE id = $1 LIMIT 1", [equipe_id])

        if (equipe.rowCount === 0) {
            return NextResponse.json({ msg: "Equipe responsável não encontrada." }, { status: 404 })
        }

        const resultado = await pool.query(
            "UPDATE posts SET equipe_id = $1, titulo = $2, descricao = $3 WHERE id = $4 RETURNING id",
            [equipe_id, titulo, descricao, postId]
        )

        if (resultado.rowCount === 0) {
            return NextResponse.json({ msg: "Post não encontrado." }, { status: 404 })
        }

        revalidatePath("/admin/posts")
        revalidatePath("/")
        revalidatePath(`/post/${postId}`)
        return NextResponse.json({ msg: "Post editado com sucesso." })
    } catch (error) {
        console.error("Erro ao editar post:", error)
        return NextResponse.json({ msg: "Erro interno do servidor." }, { status: 500 })
    }
}

// Rota para deletar
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    const res = NextResponse
    try{
        if (!await getAuthenticatedAdminFromRequest(req)) {
            return res.json({msg: "Não autorizado."}, {status: 401})
        }

        const { id } = await params
        const postId = Number(id)

        if (!Number.isSafeInteger(postId) || postId <= 0) {
            return res.json({msg: "Post inválido."},{status:400})
        }

        const searchQuery = "SELECT imagem_url FROM posts WHERE id = $1"
        const dados = await pool.query(searchQuery, [postId])
        if(dados.rowCount === 0){
            return res.json({msg: "Nenhum post encontrado com o id fornecido."},{status:404})
        }
        const { imagem_url }: dadosBanco = dados.rows[0]
        const fileKey = imagem_url.slice(imagem_url.indexOf("/imagens/") + 1)

        // realiza a operação, primeiro apagar imagem
        const comando = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: fileKey
        })
        await r2.send(comando)
        // apagar registros do banco de dados
        const query = "DELETE FROM posts WHERE id = $1"
        await pool.query(query,[postId])

        // revalida cache e manda embora
        revalidatePath('/admin/posts')
        revalidatePath('/') 
        return res.json({msg: "Post Deletado com Sucesso."},{status:200})
    }catch(erro){
        console.error("erro no endpoint de deletar post, erro: ", erro)
        return res.json({msg: "Erro Interno do Servidor"},{status:500})
    }
}

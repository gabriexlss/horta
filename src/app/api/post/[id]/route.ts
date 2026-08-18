import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { revalidatePath } from "next/cache";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2, BUCKET_NAME } from "@/lib/r2"

interface RouteParams {
  params: Promise<{ id: string }>; // No Next.js 15+ os params são uma Promise
}
interface dadosBanco{
    imagem_url: string
}
// Rota para deletar
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    const res = NextResponse
    try{
        const { id } = await params

        // verifica se veio id
        if(!id){
            return res.json({msg: "id do post é necessario para deletar"},{status:400})
        }

        // com esse id, verifica se acha alguma coluna no banco de dados
        const searchQuery = "SELECT * FROM posts WHERE id = $1"
        const dados = await pool.query(searchQuery, [id])
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
        await pool.query(query,[id])

        // revalida cache e manda embora
        revalidatePath('/admin/posts')
        revalidatePath('/') 
        return res.json({msg: "Post Deletado com Sucesso."},{status:200})
    }catch(erro){
        console.error("erro no endpoint de deletar post, erro: ", erro)
        return res.json({msg: "Erro Interno do Servidor"},{status:500})
    }
}
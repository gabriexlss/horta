import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { pool } from "@/lib/db"
import { CriarPostSchema } from "@/schemas/post.schema"
import { randomUUID } from "crypto"
import { r2, BUCKET_NAME, PUBLIC_URL } from "@/lib/r2";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
    const res = NextResponse
    try {
        const body = await req.formData()
        const formEquipeId = Number(body.get("equipe_id"))
        const formTitulo = body.get("titulo")
        const formDescricao = body.get("descricao")
        const formImagemFile = body.get("imagem_file")
        const formData = body.get("data")

        const dadosValidados = CriarPostSchema.safeParse({
            equipe_id: formEquipeId,
            titulo: formTitulo,
            descricao: formDescricao,
            imagem_file: formImagemFile,
            data: formData
        })

        if (!dadosValidados.success) {
            const primeiroErro = dadosValidados.error.issues[0]?.message || "Dados inválidos."
            return res.json({ msg: primeiroErro, erro: dadosValidados.error.format() }, { status: 400 })
        }
        const { equipe_id, titulo, descricao, imagem_file, data } = dadosValidados.data


        let fileKey: string | undefined;
        try {
            // 1. Extrai os bytes do arquivo para um Buffer
            const arrayBuffer = await imagem_file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // 2. Extrai o nome e extensão diretamente das propriedades nativas do File
            const extensao = imagem_file.name ? imagem_file.name.split('.').pop() : 'bin';
            fileKey = `imagens/${randomUUID()}.${extensao}`;

            const comando = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: fileKey,
                Body: buffer,
                ContentType: imagem_file.type || 'application/octet-stream',
            })
            await r2.send(comando)

            const imagem_url = `https://${PUBLIC_URL}/${fileKey}`

            const query = "INSERT INTO posts (equipe_id, titulo, descricao, imagem_url, data) VALUES ($1, $2, $3, $4, $5)"
            const valores = [equipe_id, titulo, descricao, imagem_url, data]

            await pool.query(query, valores)
        } catch (erro) {
            if (fileKey) {
                try {
                    const deleteCommand = new DeleteObjectCommand({
                        Bucket: BUCKET_NAME,
                        Key: fileKey,
                    });
                    await r2.send(deleteCommand);
                } catch (deleteError) {
                    console.error("Falha ao excluir a imagem órfã do R2:", deleteError);
                }
            }
            throw new Error(String(erro))
        }
        revalidatePath("/")

        return res.json({ msg: "Post Criado com Sucesso." }, { status: 201 })
    } catch (erro) {
        console.error("erro no endpoint de criação de post, erro: ", erro)
        return res.json({ msg: "Erro Interno do servidor." }, { status: 500 })
    }
}

'use client'
import styles from "../admin.module.css"
import { ChangeEvent, useRef, useState, FormEvent } from "react"
import { MdPhotoCamera, MdSend } from "react-icons/md"
import CropPopup from "./CropPopup"
import Image from "next/image"
import { membroEquipe } from "@/schemas/interfacesGlobais"
import { notify } from "@/services/toastify"

interface FormularioProps {
    equipes: membroEquipe[]
}
const Formulario = ({ equipes }: FormularioProps) => {

    // 1. Pega a data atual
    const hoje = new Date();
    const dataFormatada = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

    const [enviando, setEnviando] = useState<boolean>(false)
    const [equipe, setEquipe] = useState<number>(1)
    const [data, setData] = useState<string>(dataFormatada)
    const [titulo, setTitulo] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")

    const inputRef = useRef<HTMLInputElement>(null)
    const [imagemParaRecortar, setImagemParaRecortar] = useState<string | null>(null)
    // Este arquivo já é o resultado quadrado em WebP e ficará disponível para o envio do post.
    const [imagemRecortada, setImagemRecortada] = useState<File | null>(null)
    const [previewImagem, setPreviewImagem] = useState<string | null>(null)

    function abrirSeletor() {
        inputRef.current?.click()
    }

    function selecionarImagem(event: ChangeEvent<HTMLInputElement>) {
        const arquivo = event.target.files?.[0]
        if (!arquivo) return

        const leitor = new FileReader()
        leitor.onload = () => setImagemParaRecortar(leitor.result as string)
        leitor.readAsDataURL(arquivo)
        event.target.value = ""
    }

    function salvarImagemRecortada(imagem: File) {
        setImagemRecortada(imagem)
        const leitor = new FileReader()
        leitor.onload = () => setPreviewImagem(leitor.result as string)
        leitor.readAsDataURL(imagem)
        setImagemParaRecortar(null)
    }

    const enviarForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(enviando) return
        if(!imagemRecortada) return
        if(!titulo) return
        if(!descricao) return
        if(!equipe) return

        setEnviando(true)

        const corpo = new FormData()
        corpo.append("equipe_id", equipe.toString())
        corpo.append("titulo", titulo)
        corpo.append("descricao", descricao)
        corpo.append("imagem_file", imagemRecortada)
        corpo.append("data", data)

        try {
            const response = await fetch('/api/post/criar', {
                method: 'POST',
                body: corpo
            })
            const resposta = await response.json()
            if(response.ok){
                notify.sucesso(resposta.msg || "Post criado com sucesso")
            }else{
                notify.erro(resposta.msg || "Erro ao criar post")
            }
        } catch (e) {
            console.error("Erro ao enviar post, erro: ", e)
            notify.erro("Erro desconhecido ao enviar post.")
        }finally{
            setEnviando(false)
        }
    }
    return <>
        <form onSubmit={enviarForm} className={styles.formulario}>
            <div className={styles.campoImagem}>
                <button type="button" className={styles.imagem} onClick={abrirSeletor} aria-label="Adicionar foto da horta">
                    {imagemRecortada && previewImagem ? <Image src={previewImagem} alt="Foto da horta recortada" fill /> : <><MdPhotoCamera className={styles.imagemIcone} /><p>Adicionar Foto da Horta</p></>}
                </button>
                <input type="file" name="imagem" id="imagem" accept="image/*" ref={inputRef} onChange={selecionarImagem} />
            </div>

            <div className={styles.campo}>
                <label htmlFor="titulo">Titulo do Post</label>
                <input type="text" id="titulo" placeholder="Digite o titulo do post" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>

            <div className={styles.campo}>
                <label htmlFor="descricao">Descrição do Post</label>
                <textarea name="descricao" id="descricao" placeholder="Digite uma descrição do que foi realizado nesse post." value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
            </div>

            <div className={styles.campo}>
                <label htmlFor="dias">Dia do Post</label>
                <input type="date" id="dias" value={data} onChange={(e) => setData(e.target.value)} />
            </div>

            <div className={styles.campo}>
                <label htmlFor="dias">Equipe responsável.</label>
                <select name="equipe" id="equipe" value={equipe} onChange={(e) => setEquipe(Number(e.target.value))} required>
                    {
                        equipes.map(e => (
                            <option value={e.id} key={e.id}>{e.nome}</option>
                        ))
                    }
                </select>
            </div>

            <div className={styles.campo}>
                <button disabled={enviando}>
                    <MdSend className={styles.botaoIcone} />
                    {
                        enviando ? "Enviando..." : "Publicar no Feed"
                    }
                </button>
            </div>
        </form>
        {imagemParaRecortar && <CropPopup image={imagemParaRecortar} fechar={() => setImagemParaRecortar(null)} onConfirmar={salvarImagemRecortada} />}
    </>
}

export default Formulario
'use client'
import styles from "../admin.module.css"
import { ChangeEvent, useRef, useState, FormEvent } from "react"
import { MdPhotoCamera, MdSend } from "react-icons/md"
import CropPopup from "./CropPopup"
import Image from "next/image"
import { membroEquipe } from "@/schemas/interfacesGlobais"
import { notify } from "@/services/toastify"
import { CriarPostSchema } from "@/schemas/post.schema"
import { useRouter } from "next/navigation"

interface FormularioProps {
    equipes: membroEquipe[]
}
const Formulario = ({ equipes }: FormularioProps) => {
    // 1. Pega a data atual
    const hoje = new Date();
    const dataFormatada = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

    const [enviando, setEnviando] = useState<boolean>(false)
    const [equipe, setEquipe] = useState<number>(() => equipes[0]?.id ?? 1)
    const [data, setData] = useState<string>(dataFormatada)
    const [titulo, setTitulo] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [erros, setErros] = useState<Record<string, string>>({})

    const enviandoRef = useRef(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [imagemParaRecortar, setImagemParaRecortar] = useState<string | null>(null)
    // Este arquivo já é o resultado quadrado em WebP e ficará disponível para o envio do post.
    const [imagemRecortada, setImagemRecortada] = useState<File | null>(null)
    const [previewImagem, setPreviewImagem] = useState<string | null>(null)

    const router = useRouter()

    const limparErro = (campo: string) => {
        if (erros[campo]) {
            setErros(prev => {
                const copia = { ...prev }
                delete copia[campo]
                return copia
            })
        }
    }

    function abrirSeletor() {
        if (enviando) return
        inputRef.current?.click()
    }

    function selecionarImagem(event: ChangeEvent<HTMLInputElement>) {
        const arquivo = event.target.files?.[0]
        if (!arquivo) return

        if (!arquivo.type.startsWith("image/")) {
            setErros(prev => ({ ...prev, imagem_file: "Selecione um arquivo de imagem válido (PNG, JPEG ou WebP)." }))
            event.target.value = ""
            return
        }

        if (arquivo.size > 10 * 1024 * 1024) {
            setErros(prev => ({ ...prev, imagem_file: "A imagem original é muito grande. Escolha uma imagem de até 10MB." }))
            event.target.value = ""
            return
        }

        limparErro("imagem_file")
        const leitor = new FileReader()
        leitor.onload = () => setImagemParaRecortar(leitor.result as string)
        leitor.readAsDataURL(arquivo)
        event.target.value = ""
    }

    function salvarImagemRecortada(imagem: File) {
        setImagemRecortada(imagem)
        limparErro("imagem_file")
        const leitor = new FileReader()
        leitor.onload = () => setPreviewImagem(leitor.result as string)
        leitor.readAsDataURL(imagem)
        setImagemParaRecortar(null)
    }

    const enviarForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (enviando || enviandoRef.current) return

        // 1. Validação no Frontend com Zod
        const payload = {
            equipe_id: Number(equipe),
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            imagem_file: imagemRecortada,
            data
        }

        const validacao = CriarPostSchema.safeParse(payload)
        if (!validacao.success) {
            const novosErros: Record<string, string> = {}
            validacao.error.issues.forEach(issue => {
                const campo = issue.path[0] as string
                if (campo && !novosErros[campo]) {
                    novosErros[campo] = issue.message
                }
            })
            setErros(novosErros)
            return
        }

        setErros({})
        enviandoRef.current = true
        setEnviando(true)

        const corpo = new FormData()
        corpo.append("equipe_id", validacao.data.equipe_id.toString())
        corpo.append("titulo", validacao.data.titulo)
        corpo.append("descricao", validacao.data.descricao)
        corpo.append("imagem_file", validacao.data.imagem_file)
        corpo.append("data", validacao.data.data)

        try {
            const response = await fetch('/api/post/criar', {
                method: 'POST',
                body: corpo
            })
            const resposta = await response.json()
            if (response.ok) {
                notify.sucesso(resposta.msg || "Post criado com sucesso")
                setTitulo("")
                setDescricao("")
                setImagemRecortada(null)
                setPreviewImagem(null)
                setErros({})
                router.refresh()
            } else {
                notify.erro(resposta.msg || "Erro ao criar post")
            }
        } catch (e) {
            console.error("Erro ao enviar post, erro: ", e)
            notify.erro("Erro desconhecido ao enviar post.")
        } finally {
            setEnviando(false)
            enviandoRef.current = false
        }
    }
    return <>
        <form onSubmit={enviarForm} className={styles.formulario} noValidate>
            <div className={styles.campoImagem}>
                <button 
                    type="button" 
                    className={`${styles.imagem} ${erros.imagem_file ? styles.imagemErro : ""}`} 
                    onClick={abrirSeletor} 
                    aria-label="Adicionar foto da horta" 
                    disabled={enviando}
                >
                    {imagemRecortada && previewImagem ? (
                        <Image src={previewImagem} alt="Foto da horta recortada" fill />
                    ) : (
                        <>
                            <MdPhotoCamera className={styles.imagemIcone} />
                            <p>Adicionar Foto da Horta *</p>
                        </>
                    )}
                </button>
                {erros.imagem_file && <span className={styles.mensagemErro}>{erros.imagem_file}</span>}
                <input type="file" name="imagem" id="imagem" accept="image/png,image/jpeg,image/webp" ref={inputRef} onChange={selecionarImagem} disabled={enviando} />
            </div>

            <div className={styles.campo}>
                <label htmlFor="titulo">Título do Post (máx. 50 caracteres)</label>
                <input 
                    type="text" 
                    id="titulo" 
                    name="titulo"
                    placeholder="Digite o título do post" 
                    value={titulo} 
                    onChange={(e) => {
                        setTitulo(e.target.value)
                        limparErro("titulo")
                    }} 
                    minLength={3}
                    maxLength={50}
                    disabled={enviando}
                    required
                    className={erros.titulo ? styles.inputErro : ""}
                />
                {erros.titulo && <span className={styles.mensagemErro}>{erros.titulo}</span>}
            </div>

            <div className={styles.campo}>
                <label htmlFor="descricao">Descrição do Post</label>
                <textarea 
                    name="descricao" 
                    id="descricao" 
                    placeholder="Digite uma descrição do que foi realizado nesse post." 
                    value={descricao} 
                    onChange={(e) => {
                        setDescricao(e.target.value)
                        limparErro("descricao")
                    }}
                    minLength={5}
                    disabled={enviando}
                    required
                    className={erros.descricao ? styles.inputErro : ""}
                />
                {erros.descricao && <span className={styles.mensagemErro}>{erros.descricao}</span>}
            </div>

            <div className={styles.campo}>
                <label htmlFor="dias">Dia do Post</label>
                <input 
                    type="date" 
                    id="dias" 
                    value={data} 
                    onChange={(e) => {
                        setData(e.target.value)
                        limparErro("data")
                    }} 
                    disabled={enviando}
                    required
                    className={erros.data ? styles.inputErro : ""}
                />
                {erros.data && <span className={styles.mensagemErro}>{erros.data}</span>}
            </div>

            <div className={styles.campo}>
                <label htmlFor="equipe">Equipe responsável</label>
                <select 
                    name="equipe" 
                    id="equipe" 
                    value={equipe} 
                    onChange={(e) => {
                        setEquipe(Number(e.target.value))
                        limparErro("equipe_id")
                    }} 
                    disabled={enviando || equipes.length === 0}
                    required
                    className={erros.equipe_id ? styles.inputErro : ""}
                >
                    {equipes.map(e => (
                        <option value={e.id} key={e.id}>{e.nome}</option>
                    ))}
                </select>
                {erros.equipe_id && <span className={styles.mensagemErro}>{erros.equipe_id}</span>}
            </div>

            <div className={styles.campo}>
                <button type="submit" disabled={enviando || equipes.length === 0}>
                    <MdSend className={styles.botaoIcone} />
                    {enviando ? "Publicando..." : "Publicar no Feed"}
                </button>
            </div>
        </form>
        {imagemParaRecortar && <CropPopup image={imagemParaRecortar} fechar={() => setImagemParaRecortar(null)} onConfirmar={salvarImagemRecortada} />}
    </>
}

export default Formulario
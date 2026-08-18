'use client'
import styles from "../admin.module.css"
import { ChangeEvent, useRef, useState, FormEvent } from "react"
import { MdPhotoCamera, MdSend } from "react-icons/md"
import CropPopup from "./CropPopup"
import Image from "next/image"
import { membroEquipe } from "@/schemas/interfacesGlobais"
import { notify } from "@/services/toastify"
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
    const [erroSelecaoImagem, setErroSelecaoImagem] = useState(false)

    const enviandoRef = useRef(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [imagemParaRecortar, setImagemParaRecortar] = useState<string | null>(null)
    // Este arquivo já é o resultado quadrado em WebP e ficará disponível para o envio do post.
    const [imagemRecortada, setImagemRecortada] = useState<File | null>(null)
    const [previewImagem, setPreviewImagem] = useState<string | null>(null)

    const router = useRouter()
    const tituloValido = titulo.trim().length >= 3 && titulo.length <= 50
    const descricaoValida = descricao.trim().length >= 5
    const dataValida = Boolean(data)
    const equipeValida = equipes.some(({ id }) => id === equipe)
    const imagemValida = Boolean(imagemRecortada) && !erroSelecaoImagem
    const mostrarErroTitulo = titulo.length > 0 && !tituloValido
    const mostrarErroDescricao = descricao.length > 0 && !descricaoValida
    const mostrarErroData = Boolean(data) && !dataValida
    const formValido = tituloValido && descricaoValida && dataValida && equipeValida && imagemValida

    function abrirSeletor() {
        if (enviando) return
        inputRef.current?.click()
    }

    function selecionarImagem(event: ChangeEvent<HTMLInputElement>) {
        const arquivo = event.target.files?.[0]
        if (!arquivo) return

        if (!arquivo.type.startsWith("image/")) {
            setErroSelecaoImagem(true)
            event.target.value = ""
            return
        }

        if (arquivo.size > 10 * 1024 * 1024) {
            setErroSelecaoImagem(true)
            event.target.value = ""
            return
        }

        setErroSelecaoImagem(false)
        const leitor = new FileReader()
        leitor.onload = () => setImagemParaRecortar(leitor.result as string)
        leitor.readAsDataURL(arquivo)
        event.target.value = ""
    }

    function salvarImagemRecortada(imagem: File) {
        setImagemRecortada(imagem)
        setErroSelecaoImagem(false)
        const leitor = new FileReader()
        leitor.onload = () => setPreviewImagem(leitor.result as string)
        leitor.readAsDataURL(imagem)
        setImagemParaRecortar(null)
    }

    const enviarForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (enviando || enviandoRef.current) return

        if (!formValido || !imagemRecortada) return

        enviandoRef.current = true
        setEnviando(true)

        const corpo = new FormData()
        corpo.append("equipe_id", equipe.toString())
        corpo.append("titulo", titulo.trim())
        corpo.append("descricao", descricao.trim())
        corpo.append("imagem_file", imagemRecortada)
        corpo.append("data", data)

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
                setErroSelecaoImagem(false)
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
                    className={`${styles.imagem} ${erroSelecaoImagem ? styles.imagemErro : ""}`}
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
                <input
                    type="file"
                    name="imagem"
                    id="imagem"
                    accept="image/*"
                    ref={inputRef}
                    onChange={selecionarImagem}
                    disabled={enviando}
                    aria-invalid={erroSelecaoImagem}
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="titulo">Título do Post (máx. 50 caracteres)</label>
                <input 
                    type="text" 
                    id="titulo" 
                    name="titulo"
                    placeholder="Digite o título do post" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)}
                    minLength={3}
                    maxLength={50}
                    disabled={enviando}
                    required
                    className={mostrarErroTitulo ? styles.inputErro : ""}
                    aria-invalid={mostrarErroTitulo}
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="descricao">Descrição do Post</label>
                <textarea 
                    name="descricao" 
                    id="descricao" 
                    placeholder="Digite uma descrição do que foi realizado nesse post." 
                    value={descricao} 
                    onChange={(e) => setDescricao(e.target.value)}
                    minLength={5}
                    disabled={enviando}
                    required
                    className={mostrarErroDescricao ? styles.inputErro : ""}
                    aria-invalid={mostrarErroDescricao}
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="dias">Dia do Post</label>
                <input 
                    type="date" 
                    id="dias" 
                    value={data} 
                    onChange={(e) => setData(e.target.value)}
                    disabled={enviando}
                    required
                    className={mostrarErroData ? styles.inputErro : ""}
                    aria-invalid={mostrarErroData}
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="equipe">Equipe responsável</label>
                <select 
                    name="equipe" 
                    id="equipe" 
                    value={equipe} 
                    onChange={(e) => setEquipe(Number(e.target.value))}
                    disabled={enviando || equipes.length === 0}
                    required
                    className={equipe > 0 && !equipeValida ? styles.inputErro : ""}
                    aria-invalid={equipe > 0 && !equipeValida}
                >
                    {equipes.map(e => (
                        <option value={e.id} key={e.id}>{e.nome}</option>
                    ))}
                </select>
            </div>

            <div className={styles.campo}>
                <button type="submit" disabled={enviando || !formValido}>
                    <MdSend className={styles.botaoIcone} />
                    {enviando ? "Publicando..." : "Publicar no Feed"}
                </button>
            </div>
        </form>
        {imagemParaRecortar && (
            <CropPopup
                image={imagemParaRecortar}
                fechar={() => setImagemParaRecortar(null)}
                onConfirmar={salvarImagemRecortada}
                onErro={() => setErroSelecaoImagem(true)}
            />
        )}
    </>
}

export default Formulario

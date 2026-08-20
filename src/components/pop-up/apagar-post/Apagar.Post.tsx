'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { Post } from '@/schemas/post.schema'
import styles from './Apagar.Post.module.css'

interface PopUpProps {
    showApagarPost: boolean
    closeShowApagarPost: () => void
    posts: Post[]
}

interface ConfirmacaoProps {
    postTitulo: string
    enviando: boolean
    onCancelar: () => void
    onConfirmar: () => void
}

function ApagarPost({ showApagarPost, closeShowApagarPost, posts }: PopUpProps) {
    const router = useRouter()
    const [enviando, setEnviando] = useState(false)
    const [showConfirmar, setShowConfirmar] = useState(false)
    const [postId, setPostId] = useState<number>(0)
    const postSelecionado = posts.find(({ id }) => id === postId)

    if (!showApagarPost) return null

    const excluirPost = async () => {
        if (!postSelecionado || enviando) return
        setEnviando(true)

        try {
            const response = await fetch(`/api/post/${postSelecionado.id}`, { method: 'DELETE' })
            const dados = await response.json() as { msg?: string }

            if (!response.ok) {
                notify.erro(dados.msg || "Erro ao excluir post.")
                return
            }

            notify.sucesso(dados.msg || "Post excluído com sucesso.")
            closeShowApagarPost()
            router.refresh()
        } catch {
            notify.erro("Erro ao processar a exclusão do post.")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-apagar-post" onClose={enviando ? () => {} : closeShowApagarPost}>
            <header className={styles.header}>
                <h1 id="titulo-apagar-post">Excluir Post</h1>
                <button type="button" aria-label="Fechar" className={styles.modalClose} onClick={closeShowApagarPost} disabled={enviando}>
                    <MdClose />
                </button>
            </header>
            <div className={styles.RemoverContainer}>
                <div className={styles.RemoverSelectContainer}>
                    <label htmlFor="post-exclusao">Selecione o post:</label>
                    <select id="post-exclusao" value={postId || ""} onChange={(event) => setPostId(Number(event.target.value))} disabled={enviando}>
                        <option value="" hidden>Selecione um post</option>
                        {posts.map((post) => (
                            <option key={post.id} value={post.id}>{post.titulo}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.RemoverBotaoContainer}>
                    <button type="button" className={styles.RemoverBotao} disabled={!postSelecionado || enviando} onClick={() => setShowConfirmar(true)}>
                        Excluir Post
                    </button>
                </div>
            </div>
            {showConfirmar && postSelecionado && (
                <Confirmacao
                    postTitulo={postSelecionado.titulo}
                    enviando={enviando}
                    onCancelar={() => setShowConfirmar(false)}
                    onConfirmar={excluirPost}
                />
            )}
        </Popup>
    )
}

function Confirmacao({ postTitulo, enviando, onCancelar, onConfirmar }: ConfirmacaoProps) {
    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-confirmacao-post" onClose={enviando ? () => {} : onCancelar}>
            <header>
                <h1 id="titulo-confirmacao-post">Confirmar Exclusão</h1>
            </header>
            <div className={styles.ConfirmacaoContainer}>
                <p>Tem certeza que deseja excluir <strong>{postTitulo}</strong> do feed? Esta ação não pode ser desfeita.</p>
                <div className={styles.ConfirmacaoBotaoContainer}>
                    <button type="button" onClick={onCancelar} disabled={enviando}>Cancelar</button>
                    <button type="button" onClick={onConfirmar} disabled={enviando}>{enviando ? "Excluindo..." : "Confirmar"}</button>
                </div>
            </div>
        </Popup>
    )
}

export default ApagarPost

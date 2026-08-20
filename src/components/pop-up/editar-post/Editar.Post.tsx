'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { Post } from '@/schemas/post.schema'
import { membroEquipe } from '@/schemas/interfacesGlobais'
import styles from './Editar.Post.module.css'

interface PopUpProps {
    showEditarPost: boolean
    closeShowEditarPost: () => void
    posts: Post[]
    equipes: membroEquipe[]
}

function EditarPost({ showEditarPost, closeShowEditarPost, posts, equipes }: PopUpProps) {
    const router = useRouter()
    const [enviando, setEnviando] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<number>(0)
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [equipeId, setEquipeId] = useState<number>(0)
    const postSelecionado = posts.find(({ id }) => id === selectedPostId)
    const formValido = Boolean(
        postSelecionado &&
        equipes.some(({ id }) => id === equipeId) &&
        titulo.trim().length >= 3 &&
        titulo.trim().length <= 50 &&
        descricao.trim().length >= 5
    )

    if (!showEditarPost) return null

    const selecionarPost = (postId: number) => {
        const post = posts.find(({ id }) => id === postId)
        setSelectedPostId(postId)
        setTitulo(post?.titulo ?? '')
        setDescricao(post?.descricao ?? '')
        setEquipeId(post?.equipe_id ?? 0)
    }

    const editarPost = async () => {
        if (!formValido || enviando) return
        setEnviando(true)

        try {
            const response = await fetch(`/api/post/${selectedPostId}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ equipe_id: equipeId, titulo: titulo.trim(), descricao: descricao.trim() }),
            })
            const dados = await response.json() as { msg?: string }

            if (!response.ok) {
                notify.erro(dados.msg || "Erro ao editar post.")
                return
            }

            notify.sucesso(dados.msg || "Post editado com sucesso.")
            closeShowEditarPost()
            router.refresh()
        } catch {
            notify.erro("Erro ao processar a edição do post.")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-editar-post" onClose={enviando ? () => {} : closeShowEditarPost}>
            <header className={styles.header}>
                <h1 id="titulo-editar-post">Editar Post</h1>
                <button type="button" aria-label="Fechar" className={styles.modalClose} onClick={closeShowEditarPost} disabled={enviando}>
                    <MdClose />
                </button>
            </header>
            <div className={styles.EditarContainer}>
                <div className={styles.EditarSelectContainer}>
                    <label htmlFor="post-edicao">Selecione o post:</label>
                    <select id="post-edicao" value={selectedPostId || ""} onChange={(event) => selecionarPost(Number(event.target.value))} disabled={enviando}>
                        <option value="" hidden>Selecione um post</option>
                        {posts.map((post) => (
                            <option key={post.id} value={post.id}>{post.titulo}</option>
                        ))}
                    </select>
                </div>

                {postSelecionado && (
                    <div className={styles.EditarDownContainer}>
                        <div className={styles.EditarSelectContainer}>
                            <label htmlFor="equipe-post">Equipe responsável:</label>
                            <select id="equipe-post" value={equipeId} onChange={(event) => setEquipeId(Number(event.target.value))} disabled={enviando}>
                                {equipes.map((equipe) => (
                                    <option key={equipe.id} value={equipe.id}>{equipe.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.EditarInputContainer}>
                            <label htmlFor="titulo-post">Título do post:</label>
                            <input id="titulo-post" type="text" minLength={3} maxLength={50} value={titulo} onChange={(event) => setTitulo(event.target.value)} disabled={enviando} />
                        </div>
                        <div className={styles.EditarInputContainer}>
                            <label htmlFor="descricao-post">Descrição do post:</label>
                            <textarea id="descricao-post" minLength={5} value={descricao} onChange={(event) => setDescricao(event.target.value)} disabled={enviando} />
                        </div>
                    </div>
                )}
                <div className={styles.EditarBotaoContainer}>
                    <button type="button" className={styles.EditarBotao} onClick={editarPost} disabled={!formValido || enviando}>
                        {enviando ? "Editando..." : "Editar Post"}
                    </button>
                </div>
            </div>
        </Popup>
    )
}

export default EditarPost

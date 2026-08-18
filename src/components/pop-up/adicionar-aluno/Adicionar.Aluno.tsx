'use client'
import { useState, useRef, FormEvent } from 'react';
import styles from './AddAluno.module.css'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import { alunoCriarSchema } from '@/schemas/aluno.schema';
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"

interface membroEquipe {
    id: number,
    nome: string,
    cor: string
}
interface PopUpProps {
    showAddAluno: boolean;
    closeShowAddAluno: () => void;
    equipes: membroEquipe[]
}
function Adicionar({ showAddAluno, closeShowAddAluno, equipes }: PopUpProps) {
    const [nome, setNome] = useState("")
    const [equipeId, setEquipeId] = useState<number>(() => equipes[0]?.id ?? 1)
    const [admin, setAdmin] = useState<boolean>(false)
    const [senha, setSenha] = useState("")
    const [erros, setErros] = useState<Record<string, string>>({})
    const [enviando, setEnviando] = useState(false)
    const enviandoRef = useRef(false)
    const router = useRouter()

    if (!showAddAluno) {
        return null;
    }

    const limparErro = (campo: string) => {
        if (erros[campo]) {
            setErros(prev => {
                const copia = { ...prev }
                delete copia[campo]
                return copia
            })
        }
    }

    const handleSubmit = async (e?: FormEvent) => {
        if (e) e.preventDefault()
        if (enviandoRef.current || enviando) return

        // 1. Validação no Frontend com Zod
        const payload = {
            nome: nome.trim(),
            admin,
            equipe_id: Number(equipeId),
            senha: admin ? senha : undefined
        }

        const validacao = alunoCriarSchema.safeParse(payload)
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

        try {
            const response = await fetch('/api/aluno/criar', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(validacao.data)
            })
            const dados = await response.json()
            if (!response.ok) {
                notify.erro(dados.msg || "Erro ao cadastrar aluno")
            } else {
                notify.sucesso(dados.msg || "Aluno criado com sucesso")
                setNome("")
                setSenha("")
                setAdmin(false)
                setErros({})
                closeShowAddAluno()
                router.refresh()
            }
        } catch {
            notify.erro("Erro ao processar o cadastro do aluno.")
        } finally {
            setEnviando(false)
            enviandoRef.current = false
        }
    }

    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-adicionar-aluno" onClose={enviando ? () => {} : closeShowAddAluno}>
            <form onSubmit={handleSubmit} noValidate>
                <div className={styles.PopUpHeader}>
                    <button 
                        aria-label="Fechar" 
                        className={styles.modalClose} 
                        onClick={closeShowAddAluno} 
                        disabled={enviando}
                        type="button"
                    >
                        <MdClose />
                    </button>
                    <h1 id="titulo-adicionar-aluno">Adicionar Novo Aluno</h1>
                </div>

                <div className={styles.PopUpNome}>
                    <label htmlFor="nome">Nome Completo</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome"
                        placeholder="Ex: João Silva" 
                        value={nome} 
                        onChange={e => {
                            setNome(e.target.value)
                            limparErro("nome")
                        }} 
                        minLength={3}
                        maxLength={50}
                        required
                        disabled={enviando}
                        className={erros.nome ? styles.inputErro : ""}
                    />
                    {erros.nome && <span className={styles.mensagemErro}>{erros.nome}</span>}
                </div>

                <div className={styles.PopUpAdmin}>
                    <label htmlFor="admin">Acesso Administrativo?</label>
                    <label htmlFor="admin" className={styles.switch}>
                        <input 
                            type="checkbox" 
                            id="admin" 
                            checked={admin} 
                            onChange={e => {
                                setAdmin(e.target.checked)
                                limparErro("senha")
                            }} 
                            disabled={enviando}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                {admin && (
                    <div className={styles.PopUpNome}>
                        <label htmlFor="senha">Senha de Administrador</label>
                        <input 
                            type="password" 
                            id="senha" 
                            name="senha"
                            placeholder="Mínimo 6 caracteres" 
                            value={senha} 
                            onChange={e => {
                                setSenha(e.target.value)
                                limparErro("senha")
                            }} 
                            minLength={6}
                            maxLength={255}
                            required={admin}
                            disabled={enviando}
                            className={erros.senha ? styles.inputErro : ""}
                        />
                        {erros.senha && <span className={styles.mensagemErro}>{erros.senha}</span>}
                    </div>
                )}

                <div className={styles.PopUpEquipe}>
                    <label htmlFor="equipe">Equipe</label>
                    <select 
                        name="equipe" 
                        id="equipe" 
                        value={equipeId} 
                        onChange={e => {
                            setEquipeId(Number(e.target.value))
                            limparErro("equipe_id")
                        }}
                        disabled={enviando}
                        required
                        className={erros.equipe_id ? styles.inputErro : ""}
                    >
                        {equipes.map(e => (
                            <option key={e.id} value={e.id}>{e.nome}</option>
                        ))}
                    </select>
                    {erros.equipe_id && <span className={styles.mensagemErro}>{erros.equipe_id}</span>}
                </div>

                <div className={styles.PopUpButtons}>
                    <button type="submit" disabled={enviando}>
                        {enviando ? "Salvando..." : "Salvar Aluno"}
                    </button>
                    <button onClick={closeShowAddAluno} disabled={enviando} type="button">
                        Cancelar
                    </button>
                </div>
            </form>
        </Popup>
    )
}

export default Adicionar


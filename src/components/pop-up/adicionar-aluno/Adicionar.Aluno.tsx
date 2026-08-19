'use client'
import { useState, useRef, FormEvent } from 'react';
import styles from './AddAluno.module.css'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
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
    const [equipeId, setEquipeId] = useState<number>(() => equipes[0]?.id ?? 0)
    const [admin, setAdmin] = useState<boolean>(false)
    const [senha, setSenha] = useState("")
    const [enviando, setEnviando] = useState(false)
    const enviandoRef = useRef(false)
    const router = useRouter()
    const nomeValido = nome.trim().length >= 3 && nome.length <= 50
    const equipeValida = equipes.some(({ id }) => id === equipeId)
    const senhaValida = !admin || (senha.trim().length >= 6 && senha.length <= 255)
    const mostrarErroNome = nome.length > 0 && !nomeValido
    const mostrarErroSenha = admin && senha.length > 0 && !senhaValida
    const formValido = nomeValido && equipeValida && senhaValida

    if (!showAddAluno) {
        return null;
    }

    const handleSubmit = async (e?: FormEvent) => {
        if (e) e.preventDefault()
        if (enviandoRef.current || enviando) return

        if (!formValido) return

        enviandoRef.current = true
        setEnviando(true)

        try {
            const response = await fetch('/api/aluno/criar', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome.trim(),
                    admin,
                    equipe_id: equipeId,
                    senha: admin ? senha : undefined
                })
            })
            const dados = await response.json()
            if (!response.ok) {
                notify.erro(dados.msg || "Erro ao cadastrar aluno")
            } else {
                notify.sucesso(dados.msg || "Aluno criado com sucesso")
                setNome("")
                setSenha("")
                setAdmin(false)
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
                        onChange={e => setNome(e.target.value)}
                        minLength={3}
                        maxLength={50}
                        required
                        disabled={enviando}
                        className={mostrarErroNome ? styles.inputErro : ""}
                        aria-invalid={mostrarErroNome}
                    />
                </div>

                <div className={styles.PopUpAdmin}>
                    <label htmlFor="admin">Acesso Administrativo?</label>
                    <label htmlFor="admin" className={styles.switch}>
                        <input 
                            type="checkbox" 
                            id="admin" 
                            checked={admin} 
                            onChange={e => setAdmin(e.target.checked)}
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
                            onChange={e => setSenha(e.target.value)}
                            minLength={6}
                            maxLength={255}
                            required={admin}
                            disabled={enviando}
                            className={mostrarErroSenha ? styles.inputErro : ""}
                            aria-invalid={mostrarErroSenha}
                        />
                    </div>
                )}

                <div className={styles.PopUpEquipe}>
                    <label htmlFor="equipe">Equipe</label>
                    <select 
                        name="equipe" 
                        id="equipe" 
                        value={equipeId} 
                        onChange={e => setEquipeId(Number(e.target.value))}
                        disabled={enviando || equipes.length === 0}
                        required
                        className={equipeId > 0 && !equipeValida ? styles.inputErro : ""}
                        aria-invalid={equipeId > 0 && !equipeValida}
                    >
                        {equipes.map(e => (
                            <option key={e.id} value={e.id}>{e.nome}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.PopUpButtons}>
                    <button type="submit" disabled={enviando || !formValido}>
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

'use client'
import { useState } from 'react';
import styles from './AddAluno.module.css'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import { alunoCriar } from '@/schemas/aluno.schema';
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
    const [equipeId, setEquipeId] = useState(1)
    const [admin, setAdmin] = useState<boolean>(false)
    const [senha, setSenha] = useState("")
    const router = useRouter()

    if (!showAddAluno) {
        return null;
    }
    const enviarForm = async (dataForm: alunoCriar) => {
        if (!dataForm) return

        try {
            const response = await fetch('/api/aluno/criar', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
            const dados = await response.json()
            if (!response.ok) {
                notify.erro(dados.msg)
            } else if(response.ok){
                notify.sucesso(dados.msg)
            }
        } catch {
            notify.erro("Erro ao processar a solicitação de apagar")
        } finally {
            router.push('/admin/alunos')
            closeShowAddAluno()
        }
    }
    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-adicionar-aluno" onClose={closeShowAddAluno}>
            <div className={styles.PopUpHeader}>
                <button aria-label="Fechar" className={styles.modalClose} onClick={closeShowAddAluno} type="button">
                    <MdClose />
                </button>
                <h1 id="titulo-adicionar-aluno">Adicionar Novo Aluno</h1>
            </div>
                    <div className={styles.PopUpNome}>
                        <label htmlFor="nome">Nome Completo</label>
                        <input type="text" id="nome" placeholder="Ex: João Silva" value={nome} onChange={e => { setNome(e.target.value) }} />
                    </div>
                    <div className={styles.PopUpAdmin}>
                        <label htmlFor="admin">Acesso Administrativo?</label>
                        <label htmlFor="admin" className={styles.switch}>
                            <input type="checkbox" id="admin" checked={admin} onChange={e => { setAdmin(e.target.checked) }} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    <div className={styles.PopUpEquipe}>
                        <label htmlFor="equipe">Equipe</label>
                        <select name="equipe" id="equipe" value={equipeId} onChange={e => { setEquipeId(Number(e.target.value)) }}>
                            {
                                equipes.map(e => (
                                    <option key={e.id} value={e.id}>{e.nome}</option>
                                ))
                            }
                        </select>
                    </div>
            <div className={styles.PopUpButtons}>
                <button onClick={() => enviarForm({ nome, admin, equipe_id: equipeId })} type="button">Salvar Aluno</button>
                <button onClick={closeShowAddAluno} type="button">Cancelar</button>
            </div>
        </Popup>
    )
}

export default Adicionar

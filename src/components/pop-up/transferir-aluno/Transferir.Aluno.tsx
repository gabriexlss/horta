'use client'
import { useState } from 'react';
import { MdClose, MdMultipleStop, MdPriorityHigh } from "react-icons/md"
import Popup from "../Popup"
import { alunoCriar } from '@/schemas/aluno.schema';
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"
import styles from "./Transferir.Aluno.module.css"

interface membroEquipe {
    id: number,
    nome: string,
    cor: string
}
interface PopUpProps {
    showTransferirAluno: boolean;
    closeShowTransferirAluno: () => void;
    equipes: membroEquipe[]
}
function TransferirAluno({ showTransferirAluno, closeShowTransferirAluno, equipes }: PopUpProps) {
    const [nome, setNome] = useState("")
    const [equipeId, setEquipeId] = useState(1)

    if (!showTransferirAluno) {
        return null;
    }
    const enviarForm = async (dataForm: alunoCriar) => {
        if (!dataForm) return

        /* try {
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
            notify.erro("Erro ao processar a solicitação de transferir")
        } finally {
            router.push('/admin/alunos')
            closeShowTransferirAluno()
        } */
    }
    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-adicionar-aluno" onClose={closeShowTransferirAluno}>
            <div className={styles.PopUpHeader}>
                <button aria-label="Fechar" className={styles.modalClose} onClick={closeShowTransferirAluno} type="button">
                    <MdClose />
                </button>
                <h1 id="titulo-adicionar-aluno">Transferir Aluno</h1>
            </div>
            <div className={styles.PopUpSelect}>
                <label htmlFor="nome">Selecionar Aluno</label>
                <select name="nome" id="nome" value={nome} onChange={e => { setNome(e.target.value) }}>
                    <option value="" hidden>Selecione um aluno</option>
                    {
                        equipes.map(e => (
                            <option key={e.id} value={e.id}>{e.nome}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.PopUpSelect}>
                <label htmlFor="equipe">Selecionar Equipe de Destino</label>
                <select name="equipe" id="equipe" value={equipeId} onChange={e => { setEquipeId(Number(e.target.value)) }}>
                    <option value="" hidden>Selecione uma equipe</option>
                    {
                        equipes.map(e => (
                            <option key={e.id} value={e.id}>{e.nome}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.PopUpDescricao}>
                <p><MdPriorityHigh /></p>
                <p>Será removido da equipe atual e movido para a nova equipe selecionada.</p>
            </div>
            <div className={styles.PopUpButtons}>
                <button onClick={() => enviarForm({ nome, admin: false, equipe_id: equipeId })} type="button">Confirmar Transferência <MdMultipleStop style={{ fontSize: '1.25rem' }}/></button>
                <button onClick={closeShowTransferirAluno} type="button">Cancelar</button>
            </div>
        </Popup>
    )
}

export default TransferirAluno

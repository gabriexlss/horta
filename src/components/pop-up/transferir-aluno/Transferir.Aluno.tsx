'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdClose, MdMultipleStop, MdPriorityHigh } from "react-icons/md"
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { aluno, membroEquipe } from "@/schemas/interfacesGlobais"
import styles from "./Transferir.Aluno.module.css"

interface PopUpProps {
    showTransferirAluno: boolean
    closeShowTransferirAluno: () => void
    equipes: membroEquipe[]
    alunos: aluno[]
}

function TransferirAluno({ showTransferirAluno, closeShowTransferirAluno, equipes, alunos }: PopUpProps) {
    const router = useRouter()
    const [alunoId, setAlunoId] = useState<number>(0)
    const [equipeId, setEquipeId] = useState<number>(() => equipes[0]?.id ?? 0)
    const [enviando, setEnviando] = useState(false)
    const alunoSelecionado = alunos.find(({ id }) => id === alunoId)
    const formValido = Boolean(
        alunoSelecionado &&
        equipes.some(({ id }) => id === equipeId) &&
        alunoSelecionado.equipe_id !== equipeId
    )

    if (!showTransferirAluno) return null

    const enviarForm = async () => {
        if (!formValido || enviando) return
        setEnviando(true)

        try {
            const response = await fetch(`/api/aluno/${alunoId}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ equipe_id: equipeId }),
            })
            const dados = await response.json() as { msg?: string }

            if (!response.ok) {
                notify.erro(dados.msg || "Erro ao transferir aluno.")
                return
            }

            notify.sucesso(dados.msg || "Aluno transferido com sucesso.")
            closeShowTransferirAluno()
            router.refresh()
        } catch {
            notify.erro("Erro ao processar a transferência.")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-transferir-aluno" onClose={enviando ? () => {} : closeShowTransferirAluno}>
            <div className={styles.PopUpHeader}>
                <button aria-label="Fechar" className={styles.modalClose} onClick={closeShowTransferirAluno} disabled={enviando} type="button">
                    <MdClose />
                </button>
                <h1 id="titulo-transferir-aluno">Transferir Aluno</h1>
            </div>
            <div className={styles.PopUpSelect}>
                <label htmlFor="aluno-transferencia">Selecionar Aluno</label>
                <select id="aluno-transferencia" value={alunoId || ""} onChange={(event) => setAlunoId(Number(event.target.value))} disabled={enviando}>
                    <option value="" hidden>Selecione um aluno</option>
                    {alunos.map((item) => (
                        <option key={item.id} value={item.id}>{item.nome}</option>
                    ))}
                </select>
            </div>
            <div className={styles.PopUpSelect}>
                <label htmlFor="equipe-destino">Selecionar Equipe de Destino</label>
                <select id="equipe-destino" value={equipeId} onChange={(event) => setEquipeId(Number(event.target.value))} disabled={enviando || equipes.length === 0}>
                    {equipes.map((equipe) => (
                        <option key={equipe.id} value={equipe.id} disabled={equipe.id === alunoSelecionado?.equipe_id}>
                            {equipe.nome}{equipe.id === alunoSelecionado?.equipe_id ? " (equipe atual)" : ""}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.PopUpDescricao}>
                <p><MdPriorityHigh /></p>
                <p>Será removido da equipe atual e movido para a nova equipe selecionada.</p>
            </div>
            <div className={styles.PopUpButtons}>
                <button onClick={enviarForm} disabled={!formValido || enviando} type="button">
                    {enviando ? "Transferindo..." : "Confirmar Transferência"}
                    {!enviando && <MdMultipleStop style={{ fontSize: '1.25rem' }} />}
                </button>
                <button onClick={closeShowTransferirAluno} disabled={enviando} type="button">Cancelar</button>
            </div>
        </Popup>
    )
}

export default TransferirAluno

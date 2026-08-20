'use client'
import { useState } from 'react';
import styles from './Imprevisto.Agenda.module.css'
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"
import { Cronograma } from '@/schemas/cronograma.schema';
import FormatarData from '@/utils/formatarData';

interface PopUpProps {
    showImprevistoAgenda: boolean;
    closeShowImprevistoAgenda: () => void;
    cronogramas: Cronograma[];
}
function ImprevistoAgenda({ showImprevistoAgenda, closeShowImprevistoAgenda, cronogramas }: PopUpProps) {
    const router = useRouter()
    const [cronograma, SetCronograma] = useState(1)
    const [enviando, setEnviando] = useState(false);
    if (!showImprevistoAgenda) {
        return null;
    }
    const cronogramasAjustados = cronogramas.toSorted(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    )
    const enviarForm = async () => {
        if (enviando) return
        setEnviando(true)
        try {
            const response = await fetch(`/api/cronograma/${cronograma}`, {
                method: 'PATCH'
            })
            const resposta = await response.json()
            if (!response.ok) {
                notify.erro(resposta.msg)
            } else {
                notify.sucesso(resposta.msg)
                router.refresh()
            }
        } catch {
            notify.erro("Erro desconhecido ao marcar imprevisto em cronograma")
        } finally {
            setEnviando(false)
            closeShowImprevistoAgenda()
        }
    }
    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-apagar-agenda" onClose={enviando ? () => { } : closeShowImprevistoAgenda}>
            <header>
                <h1>Marcar Imprevisto</h1>
            </header>
            <div className={styles.RemoverContainer}>
                <div className={styles.RemoverSelectContainer}>
                    <p>
                        Selecione a data:
                    </p>
                    <select name="data" id="data" value={cronograma} onChange={(e) => SetCronograma(Number(e.target.value))}>
                        <option value="" hidden>Selecione uma data</option>
                        {cronogramasAjustados.map((cronogramas) => (
                            <option key={cronogramas.id} value={cronogramas.id}>{FormatarData(cronogramas.data)}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.RemoverBotaoContainer}>
                    <button
                        disabled={enviando}
                        type="button"
                        onClick={enviarForm}
                        className={styles.RemoverBotao}>{enviando ? "Marcando..." : "Marcar Imprevisto"}</button>
                </div>
            </div>
        </Popup>
    )
}
export default ImprevistoAgenda
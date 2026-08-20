'use client'
import { useState } from 'react';
import styles from './Apagar.Agenda.module.css'
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"
import { Cronograma } from '@/schemas/cronograma.schema';
import FormatarData from '@/utils/formatarData';

interface PopUpProps {
  showApagarAgenda: boolean;
  closeShowApagarAgenda: () => void;
  cronogramas: Cronograma[];
}

export default function ApagarAgenda({ showApagarAgenda, closeShowApagarAgenda, cronogramas }: PopUpProps) {
  const router = useRouter()
  const [enviando, setEnviando] = useState(false);
  const [cronograma, setCronograma] = useState(1)
  const cronogramasAjustados = cronogramas.toSorted(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
  )
  if (!showApagarAgenda) {
    return null;
  }
  const enviarForm = async () => {
    if (enviando) return
    setEnviando(true)
    try {
      const response = await fetch(`/api/cronograma/${cronograma}`, {
        method: 'DELETE'
      })
      const resposta = await response.json()
      if (!response.ok) {
        notify.erro(resposta.msg)
      } else {
        notify.sucesso(resposta.msg)
        router.refresh()
      }
    } catch {
      notify.erro("Erro desconhecido ao deletar cronograma")
    } finally {
      setEnviando(false)
      closeShowApagarAgenda()
    }
  }
  return (
    <Popup className={styles.AddPopUpContent} labelledBy="titulo-apagar-agenda" onClose={enviando ? () => { } : closeShowApagarAgenda}>
      <header>
        <h1>Excluir Cronograma</h1>
      </header>
      <div className={styles.RemoverContainer}>
        <div className={styles.RemoverSelectContainer}>
          <p>
            Selecione a data:
          </p>
          <select name="data" id="data" value={cronograma} onChange={(e) => setCronograma(Number(e.target.value))}>
            <option hidden>Selecione uma data</option>
            {cronogramasAjustados.map((cronograma) => (
              <option key={cronograma.id} value={cronograma.id}>{FormatarData(cronograma.data)}</option>
            ))}
          </select>
        </div>
        <div className={styles.RemoverBotaoContainer}>
          <button
            type="button"
            disabled={enviando}
            className={styles.RemoverBotao}
            onClick={enviarForm}>{enviando ? "Enviando..." : "Excluir da Agenda"}</button>
        </div>
      </div>
    </Popup>
  )
}
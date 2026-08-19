'use client'
import { useState, useRef, FormEvent } from 'react';
import styles from './Apagar.Agenda.module.css'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"

interface PopUpProps {
  showApagarAgenda: boolean;
  closeShowApagarAgenda: () => void;
  posts: any[];
}
interface ConfirmacaoProps {
  showConfirmar: boolean;
  closeShowconfirmar: () => void;
}

function ApagarAgenda({ showApagarAgenda, closeShowApagarAgenda, posts }: PopUpProps) {
  const [enviando, setEnviando] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  if (!showApagarAgenda) {
    return null;
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
          <select name="data" id="data">
            <option value="" hidden>Selecione uma data</option>
            {posts.map((post, index) => (
              <option key={index} value={post}>{post}</option>
            ))}
          </select>
        </div>
        <div className={styles.RemoverBotaoContainer}>
          <button
            type="button"
            className={styles.RemoverBotao}
            onClick={() => setShowConfirmar(true)}> Exluir da Agenda</button>
        </div>
      </div>
      {showConfirmar && <Confirmacao showConfirmar={showConfirmar} closeShowconfirmar={() => setShowConfirmar(false)} />}
    </Popup>
  )
}
function Confirmacao({ showConfirmar, closeShowconfirmar }: ConfirmacaoProps) {
  return (
    <Popup className={styles.AddPopUpContent} labelledBy="titulo-confirmacao" onClose={closeShowconfirmar}>
      <header>
        <h1>Confirmar Exclusão</h1>
      </header>
      <div className={styles.ConfirmacaoContainer}>
        <p>
          Tem certeza que deseja excluir este item da agenda? Esta ação pode não ser desfeita.
        </p>
        <div className={styles.ConfirmacaoBotaoContainer}>
          <button
            type="button"
            className={styles.ConfirmacaoBotao}
            onClick={closeShowconfirmar}>
            Cancelar
          </button>
          <button
            type="button"
            className={styles.ConfirmacaoBotao}
            onClick={closeShowconfirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </Popup>
  )
}
export default ApagarAgenda
'use client'
import styles from "../admin.module.css"
import { MdDeleteOutline, MdWarningAmber, MdBolt } from "react-icons/md"
import ApagarAgenda from "@/components/pop-up/apagar-agenda/Apagar.Agenda"
import ImprevistoAgenda from "@/components/pop-up/imprevisto-agenda/Imprevisto.Agenda"
import { useState } from "react"
interface ActionsProps {
  onDelete?: () => void;
  onWarning?: () => void;
}

const Actions = ({ onDelete, onWarning }: ActionsProps) => {
  const [showApagarAgenda, setShowApagarAgenda] = useState(false);
  const [showImprevistoAgenda, setShowImprevistoAgenda] = useState(false);

  return (
    <div>
      <section aria-label="Ações rápidas" className={styles.Acoes}>
        <header className={styles.AcoesHeader}>
          <MdBolt className={styles.AcoesHeaderIcone} />
          <h3 className={styles.AcoesHeaderTitulo}>Ações Rápidas</h3>
        </header>

        <div className={styles.AcoesGrid}>
          <button
            type="button"
            aria-label="Deletar cronograma"
            className={`${styles.AcaoBotao} ${styles.AcaoDanger}`}
            onClick={() => { setShowApagarAgenda(true) }}
            title={!onDelete ? "Ação ainda não conectada" : undefined}
          >
            <div className={styles.AcaoIconeWrapper}>
              <MdDeleteOutline />
            </div>
            <div className={styles.AcaoTexto}>
              <strong className={styles.AcaoTitulo}>Deletar</strong>
              <span className={styles.AcaoDescricao}>Excluir cronograma</span>
            </div>
          </button>

          <button
            type="button"
            aria-label="Registrar imprevisto no cronograma"
            className={`${styles.AcaoBotao} ${styles.AcaoWarning}`}
            onClick={() => { setShowImprevistoAgenda(true) }}
            title={!onWarning ? "Ação ainda não conectada" : undefined}
          >
            <div className={styles.AcaoIconeWrapper}>
              <MdWarningAmber />
            </div>
            <div className={styles.AcaoTexto}>
              <strong className={styles.AcaoTitulo}>Imprevisto</strong>
              <span className={styles.AcaoDescricao}>Marcar ocorrência</span>
            </div>
          </button>
        </div>
      </section>
      {showApagarAgenda && <ApagarAgenda posts={["Post 1", "Post 2"]} showApagarAgenda={showApagarAgenda} closeShowApagarAgenda={() => setShowApagarAgenda(false)} />}
      {showImprevistoAgenda && <ImprevistoAgenda posts={["Post 1", "Post 2"]} showImprevistoAgenda={showImprevistoAgenda} closeShowImprevistoAgenda={() => setShowImprevistoAgenda(false)} />}
    </div>
  )
}

export default Actions

'use client'
import styles from "../admin.module.css"
import { MdDeleteOutline, MdWarningAmber, MdBolt } from "react-icons/md"

interface ActionsProps {
  onDelete?: () => void;
  onWarning?: () => void;
}

const Actions = ({ onDelete, onWarning }: ActionsProps) => {
  return (
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
          onClick={onDelete}
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
          onClick={onWarning}
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
  )
}

export default Actions
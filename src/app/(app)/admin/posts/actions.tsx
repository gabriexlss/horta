'use client'
import styles from "../admin.module.css"
import { MdDeleteOutline, MdEdit, MdBolt } from "react-icons/md"

interface ActionsProps {
  onDelete?: () => void;
  onEdit?: () => void;
}

const Actions = ({ onDelete, onEdit }: ActionsProps) => {
  return (
    <section aria-label="Ações rápidas" className={styles.Acoes}>
      <header className={styles.AcoesHeader}>
        <MdBolt className={styles.AcoesHeaderIcone} />
        <h3 className={styles.AcoesHeaderTitulo}>Ações Rápidas</h3>
      </header>

      <div className={styles.AcoesGrid}>
        <button
          type="button"
          aria-label="Deletar publicação"
          className={`${styles.AcaoBotao} ${styles.AcaoDanger}`}
          onClick={onDelete}
        >
          <div className={styles.AcaoIconeWrapper}>
            <MdDeleteOutline />
          </div>
          <div className={styles.AcaoTexto}>
            <strong className={styles.AcaoTitulo}>Deletar</strong>
            <span className={styles.AcaoDescricao}>Excluir post</span>
          </div>
        </button>

        <button
          type="button"
          aria-label="Editar publicação"
          className={`${styles.AcaoBotao} ${styles.AcaoInfo}`}
          onClick={onEdit}
        >
          <div className={styles.AcaoIconeWrapper}>
            <MdEdit />
          </div>
          <div className={styles.AcaoTexto}>
            <strong className={styles.AcaoTitulo}>Editar</strong>
            <span className={styles.AcaoDescricao}>Modificar post</span>
          </div>
        </button>
      </div>
    </section>
  )
}

export default Actions
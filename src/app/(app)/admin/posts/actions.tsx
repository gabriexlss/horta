'use client'
import styles from "../admin.module.css"
import { MdDeleteOutline, MdEdit, MdBolt } from "react-icons/md"
import ApagarPost from "@/components/pop-up/apagar-post/Apagar.Post"
import EditarPost from "@/components/pop-up/editar-post/Editar.Post"
import { useState } from "react"

interface ActionsProps {
  onDelete?: () => void;
  onEdit?: () => void;
}

const Actions = ({ onDelete, onEdit }: ActionsProps) => {
  const [showApagarPost, setShowApagarPost] = useState(false);
  const [showEditarPost, setShowEditarPost] = useState(false);
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
            aria-label="Deletar publicação"
            className={`${styles.AcaoBotao} ${styles.AcaoDanger}`}
            onClick={() => { setShowApagarPost(true) }}
            disabled={false}
            title={!onDelete ? "Ação ainda não conectada" : undefined}
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
            onClick={() => { setShowEditarPost(true) }}
            disabled={false}
            title={!onEdit ? "Ação ainda não conectada" : undefined}
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
      {showApagarPost && <ApagarPost posts={["Post 1", "Post 2"]} showApagarPost={showApagarPost} closeShowApagarPost={() => setShowApagarPost(false)} />}
      {showEditarPost && <EditarPost posts={["Post 1", "Post 2"]} showEditarPost={showEditarPost} closeShowEditarPost={() => setShowEditarPost(false)} />}
    </div>
  )
}

export default Actions

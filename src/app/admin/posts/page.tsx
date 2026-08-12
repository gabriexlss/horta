'use client'
import styles from "../admin.module.css"
import { useRef } from "react"
import { MdPhotoCamera, MdSend } from "react-icons/md"

function Posts() {
  const inputRef = useRef<HTMLInputElement>(null)

  function abrirSeletor() {
    inputRef.current?.click()
  }

  return (
    <section>
      <form action="" method="post" className={styles.formulario}>
        <div className={styles.campoImagem}>
          <div className={styles.imagem} onClick={abrirSeletor}>
            <MdPhotoCamera className={styles.imagemIcone} />
            <p>Adicionar Foto da Horta</p>
          </div>
          <input type="file" name="imagem" id="imagem" accept="image/*" ref={inputRef} />
        </div>

        <div className={styles.campo}>
          <label htmlFor="titulo">Titulo do Post</label>
          <input type="text" id="titulo" placeholder="Digite o titulo do post" />
        </div>

        <div className={styles.campo}>
          <label htmlFor="descricao">Descrição do Post</label>
          <textarea name="descricao" id="descricao" placeholder="Digite uma descrição do que foi realizado nesse post."></textarea>
        </div>

        <div className={styles.campo}>
          <label htmlFor="dias">Dia do Post</label>
          <input type="date" id="dias" />
        </div>

        <div className={styles.campo}>
          <button>
            <MdSend className={styles.botaoIcone} />
            Publicar no Feed
          </button>
        </div>
      </form>
    </section>
  )
}

export default Posts
'use client'
import styles from "../admin.module.css"
import { MdDelete, MdEdit } from "react-icons/md"

const Actions = () => {
  return (
    <div className={styles.Acoes}>
        <div className={styles.AcoesBotoes} style={{backgroundColor: "#ff4d4d"}}>
          <MdDelete className={styles.AcoesIcone}/>
          <p>Deletar</p>
        </div>
        <div className={styles.AcoesBotoes} style={{backgroundColor: "#2385c2"}}>
          <MdEdit className={styles.AcoesIcone}/>
          <p>Editar</p>
        </div>
    </div>
  )
}

export default Actions
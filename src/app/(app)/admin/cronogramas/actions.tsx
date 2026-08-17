'use client'
import styles from "../admin.module.css"
import { MdDelete, MdWarning } from "react-icons/md"

const Actions = () => {
  return (
    <div className={styles.Acoes}>
        <div className={styles.AcoesBotoes} style={{backgroundColor: "#ff4d4d"}}>
          <MdDelete className={styles.AcoesIcone}/>
          <p>Deletar</p>
        </div>
        <div className={styles.AcoesBotoes} style={{backgroundColor: "#545252"}}>
          <MdWarning className={styles.AcoesIcone}/>
          <p>Imprevisto</p>
        </div>
    </div>
  )
}

export default Actions
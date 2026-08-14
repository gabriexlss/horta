import styles from "../admin.module.css"

interface alunoProps{
    aluno:string
}

const Aluno = ({aluno}: alunoProps) => {
  return (
    <div className={styles.aluno}>
        {aluno}
    </div>
  )
}

export default Aluno
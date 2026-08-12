'use client'
import styles from "../admin.module.css"

function Cronograma() {
  
  return (
    <section>
      <form action="" method="post" className={styles.formulario}>
        <div className={styles.campo}>
          <label htmlFor="dias">Selecione o dia</label>
          <input type="date" id="dias" placeholder="03/08/2026" />
        </div>

        <div className={styles.campo}>
          <label htmlFor="dias">Equipe responsável.</label>
          <select name="equipe" id="equipe">
            <option value="">Equipe Vermelha</option>
            <option value="">Equipe Azul</option>
            <option value="">Equipe Amarela</option>
            <option value="">Equipe Verde</option>
          </select>
        </div>

        <div className={styles.campo}>
          <label htmlFor="dias">Tarefa do dia.</label>
          <textarea name="" id="" placeholder="Digite uma descrição da tarefa que essa equipe realizará esse dia."></textarea>
        </div>
        <div className={styles.campo}>
          <button>Salvar Cronograma</button>
        </div>
      </form>
    </section>
  )
}

export default Cronograma
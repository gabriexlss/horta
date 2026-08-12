'use client'
import styles from "../admin.module.css"
import Aluno from "./aluno"
import { MdCompareArrows } from "react-icons/md"

function Equipes() {
  return (
    <section>
      <div className={styles.campo} id={styles.equipeCampo}>
          <label htmlFor="dias">Selecione a equipe para gerenciar</label>
          <select name="equipe" id="equipe">
            <option value="">Equipe Vermelha</option>
            <option value="">Equipe Azul</option>
            <option value="">Equipe Amarela</option>
            <option value="">Equipe Verde</option>
          </select>
        </div>

      <div className={styles.equipes}
      style={{
        borderTop: "3px solid red"
      }}>
        <h4>Equipe Vermelha</h4>

          <Aluno aluno="Gabriel"/>
          <Aluno aluno="Gabriel Pedro"/>
          <Aluno aluno="Carlos Eduardo Oliveira Amaro"/>
          <Aluno aluno="Guilherme Faquinelli Costa"/>
          <Aluno aluno="Kewen Silva Rangel"/>
          <Aluno aluno="Carlos Vinicius Rodrigues"/>
          <Aluno aluno="Wilson Roberto"/>
          <Aluno aluno="Nicolly Andrade"/>
          <Aluno aluno="Vitor de Freitas"/>

        <div className={styles.campo}>
          <button>
            <MdCompareArrows className={styles.botaoIcone}/>
            Transferir Aluno
            </button>
        </div>
      </div>

    </section>
  )
}

export default Equipes
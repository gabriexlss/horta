'use client'
import styles from "./login.module.css"
import { MdPark } from "react-icons/md"
import { useState } from "react"
import { aluno, membroEquipe } from "@/schemas/interfacesGlobais"
import TransferirAluno from "@/components/pop-up/transferir-aluno/Transferir.Aluno"

interface equipeProps {
    equipe: membroEquipe[],
    aluno: aluno[]
}
const Equipe = ({ equipe, aluno }: equipeProps) => {

    return (
        <section className={styles.loginBg}>
            <div className={styles.loginContainer}>
                <MdPark className={styles.loginIcon} />
                <h1>Projeto Horta</h1>
                <h6>Acesso ao Painel</h6>
                <div className={styles.selectContainer}>
                    <label htmlFor="email">Ecolher Aluno</label>
                    <select name="aluno" id="aluno">
                        {aluno.map((aluno) => (
                            <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                <label htmlFor="Senha">Senha</label>
                <input type="password" name="senha" id="senha" />
                </div>
                <button>Entrar no Painel</button>
            </div>
        </section>
    )
}

export default Equipe
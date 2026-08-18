'use client'
import styles from "./login.module.css"
import { MdPark } from "react-icons/md"
import { aluno, membroEquipe } from "@/schemas/interfacesGlobais"

interface equipeProps {
    equipe: membroEquipe[],
    aluno: aluno[]
}
const Equipe = ({ aluno }: equipeProps) => {

    return (
        <section className={styles.loginBg}>
            <div className={styles.loginContainer}>
                <MdPark className={styles.loginIcon} />
                <h1>Projeto Horta</h1>
                <h6>Acesso ao Painel</h6>
                <div className={styles.selectContainer}>
                    <label htmlFor="aluno">Escolher Aluno</label>
                    <select name="aluno" id="aluno" required>
                        {aluno.map((a) => (
                            <option key={a.id} value={a.id}>{a.nome}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" minLength={6} maxLength={255} required />
                </div>
                <button type="submit">Entrar no Painel</button>
            </div>
        </section>
    )
}

export default Equipe
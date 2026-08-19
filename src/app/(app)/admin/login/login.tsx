<<<<<<< HEAD
'use client'
import styles from "./login.module.css"
import { MdPark, MdArrowForward } from "react-icons/md"
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
                        <option value="" hidden>Selecione um aluno</option>
                        {aluno.map((a) => (
                            <option key={a.id} value={a.id}>{a.nome}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" minLength={6} maxLength={255} placeholder="Digite sua senha" required />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Entrar no Painel <MdArrowForward style={{ fontSize: '1.25rem' }} /></button>
                </div>
            </div>
        </section>
    )
}

=======
'use client'
import styles from "./login.module.css"
import { MdPark, MdArrowForward } from "react-icons/md"
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
                        <option value="" hidden>Selecione um aluno</option>
                        {aluno.map((a) => (
                            <option key={a.id} value={a.id}>{a.nome}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" minLength={6} maxLength={255} placeholder="Digite sua senha" required />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Entrar no Painel <MdArrowForward style={{ fontSize: '1.25rem' }} /></button>
                </div>
            </div>
        </section>
    )
}

>>>>>>> bac6b22650544ca2f3c49c40afb9e7d1943334b6
export default Equipe
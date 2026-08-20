'use client'
import styles from "./login.module.css"
import { MdPark, MdArrowForward } from "react-icons/md"
import { aluno, membroEquipe } from "@/schemas/interfacesGlobais"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

interface equipeProps {
    equipe: membroEquipe[],
    aluno: aluno[]
}
const Equipe = ({ aluno }: equipeProps) => {
    const router = useRouter()
    const [erro, setErro] = useState("")
    const [enviando, setEnviando] = useState(false)
    const alunosAdmins = aluno.filter(a => a.admin)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErro("")
        setEnviando(true)

        const formData = new FormData(event.currentTarget)

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    alunoId: Number(formData.get("aluno")),
                    senha: formData.get("senha"),
                }),
            })
            const data = await response.json() as { msg?: string }

            if (!response.ok) {
                setErro(data.msg || "Não foi possível realizar o login.")
                return
            }

            router.replace("/admin/cronogramas")
            router.refresh()
        } catch {
            setErro("Não foi possível conectar ao servidor.")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <section className={styles.loginBg}>
            <form className={styles.loginContainer} onSubmit={handleSubmit}>
                <MdPark className={styles.loginIcon} />
                <h1>Projeto Horta</h1>
                <h6>Acesso ao Painel</h6>
                <div className={styles.selectContainer}>
                    <label htmlFor="aluno">Escolher Aluno</label>
                    <select name="aluno" id="aluno" required>
                        <option value="" hidden>Selecione um aluno</option>
                        {alunosAdmins.map((a) => (
                            <option key={a.id} value={a.id}>{a.nome}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" minLength={1} maxLength={255} placeholder="Digite sua senha" required />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" disabled={enviando}>
                        {enviando ? "Entrando..." : "Entrar no Painel"}
                        {!enviando && <MdArrowForward style={{ fontSize: '1.25rem' }} />}
                    </button>
                </div>
                {erro && <p className={styles.loginErro} role="alert">{erro}</p>}
            </form>
        </section>
    )
}
export default Equipe

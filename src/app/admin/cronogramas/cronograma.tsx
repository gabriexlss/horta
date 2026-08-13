'use client'
import { FormEvent, useState } from "react";
import styles from "../admin.module.css"
import { membroEquipe } from "@/schemas/interfacesGlobais"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"
import { cronogramaCriar } from "@/schemas/cronograma.schema"

interface cronogramaProps {
    equipes: membroEquipe[]
}
const CronogramaForm = ({ equipes }: cronogramaProps) => {
    // 1. Pega a data atual
    const hoje = new Date();
    const dataFormatada = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

    const [equipe, setEquipe] = useState(() => equipes[0]?.id ?? 0)
    const [data, setData] = useState<string>(dataFormatada)
    const [tarefa, setTarefa] = useState<string>("")
    const [enviando, setEnviando] = useState(false)

    const router = useRouter()

    const enviarForm = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (enviando) return

        const dataForm: cronogramaCriar = { tarefa, equipe_id: equipe, data }
        setEnviando(true)

        try {
            const response = await fetch('/api/cronograma/criar', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
            const dados = await response.json()
            if (!response.ok) {
                notify.erro(dados.msg)
                return
            }

            if (response.ok) {
                notify.sucesso(dados.msg)
                setTarefa("")
                router.refresh()
            }
        } catch {
            notify.erro("Erro ao processar de criar cronograma")
        } finally {
            setEnviando(false)
        }
    }
    return (
        <form onSubmit={enviarForm} className={styles.formulario}>
            <div className={styles.campo}>
                <label htmlFor="dias">Selecione o dia</label>
                <input type="date" id="dias" placeholder="03/08/2026" value={data} onChange={(e) => setData(e.target.value)} required />
            </div>

            <div className={styles.campo}>
                <label htmlFor="dias">Equipe responsável.</label>
                <select name="equipe" id="equipe" value={equipe} onChange={(e) => setEquipe(Number(e.target.value))} required>
                    {
                        equipes.map(e => (
                            <option value={e.id} key={e.id}>{e.nome}</option>
                        ))
                    }
                </select>
            </div>

            <div className={styles.campo}>
                <label htmlFor="dias">Tarefa do dia.</label>
                <textarea name="tarefa" id="tarefa" placeholder="Digite uma descrição da tarefa que essa equipe realizará esse dia." value={tarefa} onChange={(e) => setTarefa(e.target.value)} minLength={5} required></textarea>
            </div>
            <div className={styles.campo}>
                <button type="submit" disabled={enviando || equipes.length === 0}>{enviando ? "Salvando..." : "Salvar Cronograma"}</button>
            </div>
        </form>
    )
}

export default CronogramaForm

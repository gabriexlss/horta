'use client'
import { FormEvent, useState, useRef } from "react";
import styles from "../admin.module.css"
import { membroEquipe } from "@/schemas/interfacesGlobais"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"

interface cronogramaProps {
    equipes: membroEquipe[]
}
const CronogramaForm = ({ equipes }: cronogramaProps) => {
    // 1. Pega a data atual
    const hoje = new Date();
    const dataFormatada = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

    const [equipe, setEquipe] = useState(() => equipes[0]?.id ?? 1)
    const [data, setData] = useState<string>(dataFormatada)
    const [tarefa, setTarefa] = useState<string>("")
    const [enviando, setEnviando] = useState(false)
    const enviandoRef = useRef(false)

    const router = useRouter()
    const dataValida = Boolean(data)
    const equipeValida = equipes.some(({ id }) => id === equipe)
    const tarefaValida = tarefa.trim().length >= 5 && tarefa.length <= 2000
    const mostrarErroData = Boolean(data) && !dataValida
    const mostrarErroTarefa = tarefa.length > 0 && !tarefaValida
    const formValido = dataValida && equipeValida && tarefaValida

    const enviarForm = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (enviando || enviandoRef.current) return

        enviandoRef.current = true
        setEnviando(true)

        try {
            const response = await fetch('/api/cronograma/criar', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    tarefa: tarefa.trim(),
                    equipe_id: equipe,
                    data
                })
            })
            const dados = await response.json()
            if (!response.ok) {
                notify.erro(dados.msg || "Erro ao salvar cronograma")
                return
            }

            if (response.ok) {
                notify.sucesso(dados.msg || "Cronograma criado com sucesso")
                setTarefa("")
                router.refresh()
            }
        } catch {
            notify.erro("Erro ao processar criação de cronograma.")
        } finally {
            setEnviando(false)
            enviandoRef.current = false
        }
    }
    return (
        <form onSubmit={enviarForm} className={styles.formulario} noValidate>
            <div className={styles.campo}>
                <label htmlFor="dias">Selecione o dia</label>
                <input 
                    type="date" 
                    id="dias" 
                    value={data} 
                    onChange={(e) => setData(e.target.value)}
                    disabled={enviando}
                    required
                    className={mostrarErroData ? styles.inputErro : ""}
                    aria-invalid={mostrarErroData}
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="equipe">Equipe responsável</label>
                <select 
                    name="equipe" 
                    id="equipe" 
                    value={equipe} 
                    onChange={(e) => setEquipe(Number(e.target.value))}
                    disabled={enviando || equipes.length === 0}
                    required
                    className={equipe > 0 && !equipeValida ? styles.inputErro : ""}
                    aria-invalid={equipe > 0 && !equipeValida}
                >
                    {equipes.map(e => (
                        <option value={e.id} key={e.id}>{e.nome}</option>
                    ))}
                </select>
            </div>

            <div className={styles.campo}>
                <label htmlFor="tarefa">Tarefa do dia</label>
                <textarea 
                    name="tarefa" 
                    id="tarefa" 
                    placeholder="Digite uma descrição detalhada da tarefa que essa equipe realizará no dia." 
                    value={tarefa} 
                    onChange={(e) => setTarefa(e.target.value)}
                    minLength={5} 
                    maxLength={2000}
                    disabled={enviando}
                    required
                    className={mostrarErroTarefa ? styles.inputErro : ""}
                    aria-invalid={mostrarErroTarefa}
                />
            </div>
            <div className={styles.campo}>
                <button type="submit" disabled={enviando || !formValido || equipes.length === 0}>
                    {enviando ? "Salvando..." : "Salvar Cronograma"}
                </button>
            </div>
        </form>
    )
}

export default CronogramaForm

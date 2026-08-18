'use client'
import { FormEvent, useState, useRef } from "react";
import styles from "../admin.module.css"
import { membroEquipe } from "@/schemas/interfacesGlobais"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"
import { cronogramaCriarSchema } from "@/schemas/cronograma.schema"

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
    const [erros, setErros] = useState<Record<string, string>>({})
    const [enviando, setEnviando] = useState(false)
    const enviandoRef = useRef(false)

    const router = useRouter()

    const limparErro = (campo: string) => {
        if (erros[campo]) {
            setErros(prev => {
                const copia = { ...prev }
                delete copia[campo]
                return copia
            })
        }
    }

    const enviarForm = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (enviando || enviandoRef.current) return

        // 1. Validação no Frontend com Zod
        const payload = {
            tarefa: tarefa.trim(),
            equipe_id: Number(equipe),
            data
        }

        const validacao = cronogramaCriarSchema.safeParse(payload)
        if (!validacao.success) {
            const novosErros: Record<string, string> = {}
            validacao.error.issues.forEach(issue => {
                const campo = issue.path[0] as string
                if (campo && !novosErros[campo]) {
                    novosErros[campo] = issue.message
                }
            })
            setErros(novosErros)
            return
        }

        setErros({})
        enviandoRef.current = true
        setEnviando(true)

        try {
            const response = await fetch('/api/cronograma/criar', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(validacao.data)
            })
            const dados = await response.json()
            if (!response.ok) {
                notify.erro(dados.msg || "Erro ao salvar cronograma")
                return
            }

            if (response.ok) {
                notify.sucesso(dados.msg || "Cronograma criado com sucesso")
                setTarefa("")
                setErros({})
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
                    onChange={(e) => {
                        setData(e.target.value)
                        limparErro("data")
                    }} 
                    disabled={enviando}
                    required 
                    className={erros.data ? styles.inputErro : ""}
                />
                {erros.data && <span className={styles.mensagemErro}>{erros.data}</span>}
            </div>

            <div className={styles.campo}>
                <label htmlFor="equipe">Equipe responsável</label>
                <select 
                    name="equipe" 
                    id="equipe" 
                    value={equipe} 
                    onChange={(e) => {
                        setEquipe(Number(e.target.value))
                        limparErro("equipe_id")
                    }} 
                    disabled={enviando || equipes.length === 0}
                    required
                    className={erros.equipe_id ? styles.inputErro : ""}
                >
                    {equipes.map(e => (
                        <option value={e.id} key={e.id}>{e.nome}</option>
                    ))}
                </select>
                {erros.equipe_id && <span className={styles.mensagemErro}>{erros.equipe_id}</span>}
            </div>

            <div className={styles.campo}>
                <label htmlFor="tarefa">Tarefa do dia</label>
                <textarea 
                    name="tarefa" 
                    id="tarefa" 
                    placeholder="Digite uma descrição detalhada da tarefa que essa equipe realizará no dia." 
                    value={tarefa} 
                    onChange={(e) => {
                        setTarefa(e.target.value)
                        limparErro("tarefa")
                    }} 
                    minLength={5} 
                    maxLength={2000}
                    disabled={enviando}
                    required
                    className={erros.tarefa ? styles.inputErro : ""}
                />
                {erros.tarefa && <span className={styles.mensagemErro}>{erros.tarefa}</span>}
            </div>
            <div className={styles.campo}>
                <button type="submit" disabled={enviando || equipes.length === 0}>
                    {enviando ? "Salvando..." : "Salvar Cronograma"}
                </button>
            </div>
        </form>
    )
}

export default CronogramaForm


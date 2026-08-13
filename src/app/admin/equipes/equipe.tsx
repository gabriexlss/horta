'use client'
import styles from "../admin.module.css"
import Aluno from "./aluno"
import { MdCompareArrows } from "react-icons/md"
import { useState } from "react"

interface membroEquipe {
    id: number,
    nome: string,
    cor: string
}
interface Aluno {
    id: number,
    nome: string,
    equipe_id: number
}
interface equipeProps {
    equipe: membroEquipe[],
    aluno: Aluno[]
}
const Equipe = ({ equipe, aluno }: equipeProps) => {
    const [equipeSelecionada, setEquipeSelecionada] = useState<number>(1)
    return (
        <div>
            <div className={styles.campo} id={styles.equipeCampo}>
                <label htmlFor="dias">Selecione a equipe para gerenciar</label>
                <select
                    name="equipe"
                    id="equipe"
                    onChange={(e) => setEquipeSelecionada(Number(e.target.value))}
                    value={equipeSelecionada}
                >
                    {equipe.map(e => (
                        <option key={e.id} value={e.id}>{e.nome}</option>
                    ))}
                </select>
            </div>

            <div className={styles.equipes}
                style={{
                    borderTop: `2px solid ${equipe[equipeSelecionada - 1].cor}`
                }}>
                <h4>{`Equipe ${equipe[equipeSelecionada - 1].nome}`}</h4>

                {(() => {
                    const alunosFiltrados = aluno.filter((p) => p.equipe_id == equipe[equipeSelecionada - 1].id) || [];

                    // 2. Se a lista filtrada tiver itens, faz o map (peguei essa parte do codigo com o gpt)
                    if (alunosFiltrados.length > 0) {
                        return alunosFiltrados.map((a) => (
                            <Aluno key={a.id} aluno={a.nome} />
                        ));
                    }
                    // 3. Se não tiver nenhum, mostra a mensagem de erro guloso
                    return <p>Nenhum Aluno Encontrado nessa Equipe</p>
                })()}

                <div className={styles.campo}>
                    <button>
                        <MdCompareArrows className={styles.botaoIcone} />
                        Transferir Aluno
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Equipe
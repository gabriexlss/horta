'use client'

import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import styles from "./RemoverAluno.module.css"

interface RemoverAlunoProps {
    alunoNome: string;
    carregando?: boolean;
    onCancelar: () => void;
    onConfirmar: () => void;
}

function RemoverAluno({ alunoNome, carregando = false, onCancelar, onConfirmar }: RemoverAlunoProps) {
    const handleConfirmar = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (carregando) return
        onConfirmar()
    }

    const handleCancelar = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (carregando) return
        onCancelar()
    }

    return (
        <Popup className={styles.modal} labelledBy="titulo-excluir-aluno" onClose={carregando ? () => {} : onCancelar}>
            <header className={styles.header}>
                <h1 id="titulo-excluir-aluno">Excluir aluno</h1>
                <button 
                    aria-label="Fechar" 
                    className={styles.close} 
                    onClick={handleCancelar} 
                    disabled={carregando}
                    type="button"
                >
                    <MdClose />
                </button>
            </header>
            <p> 
                Tem certeza que deseja excluir <strong>{alunoNome}</strong>? Esta ação não pode ser desfeita.
            </p>
            <footer className={styles.actions}>
                <button 
                    className={styles.cancel} 
                    onClick={handleCancelar} 
                    disabled={carregando}
                    type="button"
                >
                    Cancelar
                </button>
                <button 
                    className={styles.delete} 
                    onClick={handleConfirmar} 
                    disabled={carregando}
                    type="button"
                >
                    {carregando ? "Removendo..." : "Remover aluno"}
                </button>
            </footer>
        </Popup>
    )
}

export default RemoverAluno

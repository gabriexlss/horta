'use client'

import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import styles from "./RemoverAluno.module.css"

interface RemoverAlunoProps {
    alunoNome: string;
    onCancelar: () => void;
    onConfirmar: () => void;
}

function RemoverAluno({ alunoNome, onCancelar, onConfirmar }: RemoverAlunoProps) {
    return (
        <Popup className={styles.modal} labelledBy="titulo-excluir-aluno" onClose={onCancelar}>
            <header className={styles.header}>
                <h1 id="titulo-excluir-aluno">Excluir aluno</h1>
                <button aria-label="Fechar" className={styles.close} onClick={onCancelar} type="button">
                    <MdClose />
                </button>
            </header>
            <p>
                Tem certeza que deseja excluir <strong>{alunoNome}</strong>? Esta ação não pode ser desfeita.
            </p>
            <footer className={styles.actions}>
                <button className={styles.cancel} onClick={onCancelar} type="button">Cancelar</button>
                <button className={styles.delete} onClick={onConfirmar} type="button">Remover aluno</button>
            </footer>
        </Popup>
    )
}

export default RemoverAluno

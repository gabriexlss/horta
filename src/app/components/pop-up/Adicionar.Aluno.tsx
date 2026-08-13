'use client'
import styles from './AddAluno.module.css'
import { MdClose } from "react-icons/md"

interface membroEquipe {
    id: number,
    nome: string,
    cor: string
}
interface PopUpProps {
    showAddAluno: boolean;
    closeShowAddAluno: () => void;
    equipes: membroEquipe[]
}
function Adicionar({ showAddAluno, closeShowAddAluno, equipes }: PopUpProps) {
    if (!showAddAluno) {
        return null;
    }
    return (
        <section>
            <div className={styles.AddPopUp}>
                <div className={styles.AddPopUpContent}>
                    <div className={styles.PopUpHeader}>
                        <button className={styles.modalClose} onClick={closeShowAddAluno}>
                            <MdClose />
                        </button>
                        <h1>Adicionar Novo Aluno</h1>
                    </div>
                    <div className={styles.PopUpNome}>
                        <label htmlFor="nome">Nome Completo</label>
                        <input type="text" id="nome" placeholder="Ex: João Silva" />
                    </div>
                    <div className={styles.PopUpAdmin}>
                        <label htmlFor="admin">Acesso Administrativo?</label>
                        <label htmlFor="admin" className={styles.switch}>
                            <input type="checkbox" id="admin" />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    <div className={styles.PopUpEquipe}>
                        <label htmlFor="equipe">Equipe</label>
                        <select name="equipe" id="equipe">
                            {
                                equipes.map(e => (
                                    <option key={e.id} value={e.id}>{e.nome}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={styles.PopUpButtons}>
                        <button>Salvar Aluno</button>
                        <button onClick={closeShowAddAluno}>Cancelar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Adicionar
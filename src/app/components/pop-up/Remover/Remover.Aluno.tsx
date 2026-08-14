'use client'
import styles from '../PopUp.module.css'

interface PopUpProps {
    showRmvAluno: boolean;
    closeShowRmvAluno: () => void;
}
function Remover({ showRmvAluno, closeShowRmvAluno }: PopUpProps) {
    if (!showRmvAluno) {
        return null;
    }
    return (
        <section>
            <div className={styles.AddPopUp}>
                <div className={styles.AddPopUpContent}>
                    <div className={styles.PopUpHeader} style={{ marginBottom: '1rem' }}>
                        <h1>Excluir Aluno</h1>
                    </div>
                    <div className={styles.PopUpNome}>
                        <label htmlFor="nome">Tem certeza que deseja excluir o aluno? Esta opção não pode ser desfeita.</label>
                    </div>
                    <div className={styles.PopUpButtons}>
                        <button style={{ backgroundColor: 'red', color: 'white' }}>Remover Aluno</button>
                        <button onClick={closeShowRmvAluno}>Cancelar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Remover
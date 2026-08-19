'use client'
import { useState, useRef, FormEvent } from 'react';
import styles from './Apagar.Post.module.css'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"

interface PopUpProps {
    showApagarPost: boolean;
    closeShowApagarPost: () => void;
    posts: any[];
}
interface ConfirmacaoProps {
    showConfirmar: boolean;
    closeShowconfirmar: () => void;
}

function ApagarPost({ showApagarPost, closeShowApagarPost, posts }: PopUpProps) {
    const [enviando, setEnviando] = useState(false);
    const [showConfirmar, setShowConfirmar] = useState(false);
    if (!showApagarPost) {
        return null;
    }
    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-apagar-agenda" onClose={enviando ? () => { } : closeShowApagarPost}>
            <header>
                <h1>Excluir Post</h1>
            </header>
            <div className={styles.RemoverContainer}>
                <div className={styles.RemoverSelectContainer}>
                    <p>
                        Selecione o post:
                    </p>
                    <select name="data" id="data">
                        <option value="" hidden>Selecione um post</option>
                        {posts.map((post, index) => (
                            <option key={index} value={post}>{post}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.RemoverBotaoContainer}>
                    <button
                        type="button"
                        className={styles.RemoverBotao}
                        onClick={() => setShowConfirmar(true)}> Exluir Post</button>
                </div>
            </div>
            {showConfirmar && <Confirmacao showConfirmar={showConfirmar} closeShowconfirmar={() => setShowConfirmar(false)} />}
        </Popup>
    )
}
function Confirmacao({ showConfirmar, closeShowconfirmar }: ConfirmacaoProps) {
    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-confirmacao" onClose={closeShowconfirmar}>
            <header>
                <h1>Confirmar Exclusão</h1>
            </header>
            <div className={styles.ConfirmacaoContainer}>
                <p>
                    Tem certeza que deseja excluir este item do feed? Esta ação pode não ser desfeita.
                </p>
                <div className={styles.ConfirmacaoBotaoContainer}>
                    <button
                        type="button"
                        className={styles.ConfirmacaoBotao}
                        onClick={closeShowconfirmar}>
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className={styles.ConfirmacaoBotao}
                        onClick={closeShowconfirmar}>
                        Confirmar
                    </button>
                </div>
            </div>
        </Popup>
    )
}
export default ApagarPost
'use client'
import { useState, useRef, FormEvent } from 'react';
import styles from './Imprevisto.Agenda.module.css'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"

interface PopUpProps {
    showImprevistoAgenda: boolean; 
    closeShowImprevistoAgenda: () => void;
    posts: any[];
}
function ImprevistoAgenda({ showImprevistoAgenda, closeShowImprevistoAgenda, posts }: PopUpProps) {
    const [enviando, setEnviando] = useState(false);
    if (!showImprevistoAgenda) {
        return null;
    }
    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-apagar-agenda" onClose={enviando ? () => { } : closeShowImprevistoAgenda}>
            <header>
                <h1>Marcar Imprevisto</h1>
            </header>
            <div className={styles.RemoverContainer}>
                <div className={styles.RemoverSelectContainer}>
                    <p>
                        Selecione a data:
                    </p>
                    <select name="data" id="data">
                        <option value="" hidden>Selecione uma data</option>
                        {posts.map((post, index) => (
                            <option key={index} value={post}>{post}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.RemoverBotaoContainer}>
                    <button
                        type="button"
                        className={styles.RemoverBotao}> Marcar Imprevisto</button>
                </div>
            </div>
        </Popup>
    )
}
export default ImprevistoAgenda
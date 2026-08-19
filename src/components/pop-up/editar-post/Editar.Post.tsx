'use client'
import { useState, useRef, FormEvent } from 'react';
import styles from './Editar.Post.module.css'
import { MdClose } from "react-icons/md"
import Popup from "../Popup"
import { notify } from "@/services/toastify"
import { useRouter } from "next/navigation"
import image from "@/app/(app)/4732760f-05bf-40e8-ac6f-ec24fb23b585.webp"

interface PopUpProps {
    showEditarPost: boolean;
    closeShowEditarPost: () => void;
    posts: any[];
}

function EditarPost({ showEditarPost, closeShowEditarPost, posts }: PopUpProps) {
    const [enviando, setEnviando] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string>('');
    if (!showEditarPost) {
        return null;
    }
    return (
        <Popup className={styles.AddPopUpContent} labelledBy="titulo-editar-agenda" onClose={enviando ? () => { } : closeShowEditarPost}>
            <header>
                <h1>Editar Post</h1>
            </header>
            <div className={styles.EditarContainer}>
                <div className={styles.EditarSelectContainer}>
                    <p>
                        Selecione o post:
                    </p>
                    <select name="data" id="data" >
                        <option value="" hidden>Selecione um post</option>
                        {posts.map((post, index) => (
                            <option key={index} value={post}>{post}</option>
                        ))}
                    </select>
                </div>
                
                <div className={styles.EditarDownContainer}>
                    {/* é para aparecer como flex quando um post é selecionado */}
                    <div className={styles.EditarImagemContainer}>
                        <img src={image.src} alt="Imagem do Post" />
                    </div>
                    <div className={styles.EditarInputContainer}>
                        <label htmlFor="">Título do post:</label>
                        <input type="text" placeholder="Alterar o título do post" value={"coisas"} />
                    </div>
                    <div className={styles.EditarInputContainer}>
                        <label htmlFor="">Descrição do post:</label>
                        <textarea name="" id="" placeholder="Alterar a descrição do post" value="Descrição do post"></textarea>
                    </div>
                </div>
                <div className={styles.EditarBotaoContainer}>
                    <button
                        type="button"
                        className={styles.EditarBotao}> Editar Post</button>
                </div>
            </div>
        </Popup>
    )
}
export default EditarPost
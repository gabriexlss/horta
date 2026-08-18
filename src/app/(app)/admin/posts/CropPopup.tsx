'use client'

import { useState } from "react"
import Cropper, { Area } from "react-easy-crop"
import { MdClose } from "react-icons/md"
import Popup from "@/components/pop-up/Popup"
import styles from "./CropPopup.module.css"

interface CropPopupProps {
    image: string;
    fechar: () => void;
    onConfirmar: (imagem: File) => void;
    onErro: (mensagem: string) => void;
}

const criarImagem = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", reject)
    image.src = src
})

async function gerarImagemRecortada(imageSrc: string, area: Area) {
    const image = await criarImagem(imageSrc)
    const canvas = document.createElement("canvas")
    const maiorDimensao = 1600
    const escala = Math.min(1, maiorDimensao / Math.max(area.width, area.height))
    canvas.width = Math.round(area.width * escala)
    canvas.height = Math.round(area.height * escala)

    const context = canvas.getContext("2d")
    if (!context) {
        throw new Error("Não foi possível preparar o recorte da imagem.")
    }

    context.drawImage(
        image,
        area.x,
        area.y,
        area.width,
        area.height,
        0,
        0,
        canvas.width,
        canvas.height,
    )

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob)
            else reject(new Error("Não foi possível converter a imagem para WebP."))
        }, "image/webp", 0.9)
    })
}

const CropPopup = ({ image, fechar, onConfirmar, onErro }: CropPopupProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [areaRecortada, setAreaRecortada] = useState<Area | null>(null)
    const [processando, setProcessando] = useState(false)

    async function confirmarRecorte() {
        if (!areaRecortada) return

        setProcessando(true)
        try {
            const imagemWebp = await gerarImagemRecortada(image, areaRecortada)
            onConfirmar(new File([imagemWebp], "foto-da-horta.webp", { type: "image/webp" }))
        } catch {
            onErro("Não foi possível processar esta imagem. Escolha outro arquivo de imagem.")
            fechar()
        } finally {
            setProcessando(false)
        }
    }

    return (
        <Popup className={styles.modal} labelledBy="titulo-recorte" onClose={fechar}>
            <header className={styles.header}>
                <div>
                    <h1 id="titulo-recorte">Recortar foto</h1>
                    <p>Ajuste a área quadrada que será usada no post.</p>
                </div>
                <button type="button" className={styles.fechar} onClick={fechar} aria-label="Fechar recorte">
                    <MdClose />
                </button>
            </header>

            <div className={styles.areaCrop}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(_, areaPixels) => setAreaRecortada(areaPixels)}
                />
            </div>

            <label className={styles.zoom} htmlFor="zoom">Zoom
                <input id="zoom" type="range" min={1} max={3} step={0.1} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
            </label>

            <footer className={styles.acoes}>
                <button type="button" className={styles.cancelar} onClick={fechar}>Cancelar</button>
                <button type="button" className={styles.confirmar} onClick={confirmarRecorte} disabled={processando}>
                    {processando ? "Preparando..." : "Usar foto"}
                </button>
            </footer>
        </Popup>
    )
}

export default CropPopup

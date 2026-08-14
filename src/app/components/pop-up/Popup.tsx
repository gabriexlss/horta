'use client'

import { ReactNode } from "react"
import styles from "./Popup.module.css"

interface PopupProps {
    children: ReactNode;
    className?: string;
    labelledBy?: string;
    onClose: () => void;
}

function Popup({ children, className, labelledBy, onClose }: PopupProps) {
    return (
        <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
            <section
                aria-labelledby={labelledBy}
                aria-modal="true"
                className={className}
                role="dialog"
                onMouseDown={(event) => event.stopPropagation()}
            >
                {children}
            </section>
        </div>
    )
}

export default Popup

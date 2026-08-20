import Link from "next/link"
import { MdArrowForward } from "react-icons/md"
import styles from "./EquipeBadge.module.css"

interface EquipeBadgeProps {
    equipeId: number
    nome: string
    cor: string
}

export default function EquipeBadge({ equipeId, nome, cor }: EquipeBadgeProps) {
    return (
        <Link
            href={`/equipe/${equipeId}`}
            className={styles.badge}
            style={{ backgroundColor: cor }}
            aria-label={`Ver membros da equipe ${nome}`}
        >
            <span>Equipe {nome}</span>
        </Link>
    )
}

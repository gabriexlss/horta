'use client'
import { ReactNode } from "react";
import styles from "./Navbar.module.css"
import Link from "next/link";

interface buttonProps {
    icone: ReactNode,
    nome: string,
    link: string,
    selected: boolean
}

const Button = ({icone, nome, link, selected}: buttonProps) => {
  return (
    <Link className={`${styles.button} ${selected ? styles.selected : ""}`} href={link}>
        {icone}
        <span>{nome}</span>
    </Link>
  )
}

export default Button
'use client'
import { usePathname } from "next/navigation";
import styles from "./Header.module.css"

const Header = () => {
    const pathname = usePathname()

    const titulo = (() => {
    switch (pathname) {
        case "/":
            return "Feed";
        case "/cronograma":
            return "Cronograma";
        case "/admin":
            return "Admin"
        default:
            return "";
    }
})();
  return (
    <header className={styles.header}>
        <h1 className={styles.titulo}>{titulo}</h1>
    </header>
  )
}

export default Header
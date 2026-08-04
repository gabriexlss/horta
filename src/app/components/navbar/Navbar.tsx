'use client'
import styles from "./Navbar.module.css"
import { MdWindow, MdCalendarMonth, MdAdminPanelSettings } from "react-icons/md"
import Button from "./Button"
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname()
  return (
    <nav className={styles.navBar}>
        <Button nome="Feed" icone={<MdWindow className={styles.icon}/>} link="/" selected={pathname === "/"}/>
        <Button nome="Cronograma" icone={<MdCalendarMonth className={styles.icon}/>} link="/cronograma" selected={pathname === "/cronograma"}/>
        <Button nome="Admin" icone={<MdAdminPanelSettings className={styles.icon}/>} link="/admin" selected={pathname === "/admin"}/>
    </nav>
  )
}

export default Navbar
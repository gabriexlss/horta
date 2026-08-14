import Link from "next/link";
import { MdExploreOff, MdHome } from "react-icons/md";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container} aria-labelledby="global-not-found-title">
      <section className={styles.card} role="region" aria-label="Página não encontrada">
        <header className={styles.illustration} aria-hidden="true">
          <MdExploreOff size={48} />
          <span className={styles.badge}>404</span>
        </header>

        <span className={styles.code}>Erro 404</span>
        <h1 id="global-not-found-title" className={styles.title}>
          Página Não Encontrada
        </h1>

        <p className={styles.description}>
          Desculpe, a página que você está procurando não existe ou foi movida para outro endereço.
        </p>

        <nav className={styles.actions} aria-label="Navegação para página inicial">
          <Link href="/" className={styles.btnPrimary} aria-label="Voltar para a página inicial">
            <MdHome size={20} aria-hidden="true" />
            <span>Voltar ao Início</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}

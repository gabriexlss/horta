import Link from "next/link";
import { MdSearchOff, MdHome } from "react-icons/md";
import styles from "./NotFound.module.css";

export default function PostNotFound() {
    return (
        <main className={styles.container} aria-labelledby="not-found-title">
            <section className={styles.card} role="region" aria-label="Aviso de publicação não encontrada">
                <header className={styles.illustration} aria-hidden="true">
                    <MdSearchOff size={48} />
                    <span className={styles.badge}>404</span>
                </header>

                <span className={styles.code}>Ops! Publicação não encontrada</span>
                <h1 id="not-found-title" className={styles.title}>
                    Esta postagem não existe
                </h1>

                <p className={styles.description}>
                    A publicação que você está procurando pode ter sido removida, o link digitado pode estar incorreto ou o post ainda não foi criado na horta.
                </p>

                <nav className={styles.actions} aria-label="Opções de navegação">
                    <Link href="/" className={styles.btnPrimary} aria-label="Voltar para a página inicial">
                        <MdHome size={20} aria-hidden="true" />
                        <span>Página Inicial</span>
                    </Link>
                </nav>
            </section>
        </main>
    );
}

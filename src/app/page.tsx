import styles from "./page.module.css";
import { MdEco } from "react-icons/md"
import Posts from "./Posts"
import { pool } from "@/lib/db"

async function Home() {
  const query = "SELECT id, titulo, descricao, equipe_id, data, imagem_url FROM posts"
  const posts = await pool.query(query)
  return (
    <main>
      <div className={styles.cardApresentacao}>
        <div>
          <h2>Projeto Horta</h2>
          <h2>3DSA 2026</h2>
        </div>
        <p> Transformando a escola através da sustentabilidade e do contato com a terra. Acompanhe o crescimento e as descobertas da nossa horta comunitária. </p>
      </div>

      <div className={styles.secao}>
        <MdEco className={styles.icone} />
        <h2>Mural de Atividades</h2>
      </div>
      <Posts post={posts.rows}/>
    </main>
  );
}
export default Home
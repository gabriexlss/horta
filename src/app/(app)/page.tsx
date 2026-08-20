import styles from "./page.module.css";
import { MdEco } from "react-icons/md"
import Posts from "./Posts"
import { get } from "@/services/get";

async function Home() {
  const posts = await get.posts()
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
      <Posts post={posts}/>
    </main>
  );
}
export default Home
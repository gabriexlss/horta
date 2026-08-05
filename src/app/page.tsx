import styles from "./page.module.css";
import { MdEco } from "react-icons/md"
import Post from "@/app/components/Post/Post"


const postsMockup = [
  {
    id: 1,
    titulo: "Como plantar tomates cheios de aura",
    descricao: "Aprenda a cultivar tomates em casa, farmando 5 kilos de aura no processo.",
    imagem: "https://picsum.photos/500",
    data: new Date('2026-10-06'),
    link: "/pagina/01"
  },
  {
    id: 2,
    titulo: "Horta em apartamento",
    descricao: "Dicas para quem tem pouco espaço e quer gozar de ladinho com pouco esforço",
    imagem: "https://picsum.photos/1000",
    data: new Date('2026-11-16'),
    link: "/pagina/02"
  },
  {
    id: 3,
    titulo: "Melhores adubos naturais para transcender",
    descricao: "Veja quais adubos usar na sua horta para transcender e ligar o megabrain do seu cerebro junto do copthief e do super whisper",
    imagem: "https://picsum.photos/2000",
    data: new Date('2026-08-03'),
    link: "/pagina/03"
  },
];

function Home() {
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
        <MdEco className={styles.icone}/>
        <h2>Mural de Atividades</h2>
      </div>

      {/* Posts */}
      {postsMockup.map(post => (
        <Post titulo={post.titulo} corpo={post.descricao} imagem={post.imagem} data={post.data} link={post.link} key={post.id}/>
      ))}
    </main>
  );
}
export default Home
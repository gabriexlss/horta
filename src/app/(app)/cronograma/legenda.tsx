import styles from './cronograma.module.css'

interface legendaProps {
    cor: string,
    texto: string
}
const Legenda = ({ cor, texto }: legendaProps) => {
    return (
        <div
            className={styles.legendaItem}>
            <div
                style={{
                    backgroundColor: cor
                }}></div>
            <p>{texto}</p>
        </div>
    )
}

export default Legenda
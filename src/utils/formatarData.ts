export default function FormatarData(data: string) {
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(data))
    return dataFormatada
}
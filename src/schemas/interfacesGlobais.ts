export interface membroEquipe {
    id: number,
    nome: string,
    cor: string
}
export interface aluno {
    nome: string,
    id: number,
    admin: boolean,
    equipe_id: number
}
export interface Cronograma {
    tarefa: string;
    id: number;
    data: string | Date;
    equipe_id: number;
    imprevisto: boolean;
}
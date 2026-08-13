"use client";

import { ptBR } from "react-day-picker/locale";
import { DayPicker } from "@daypicker/react";
import styles from "./cronograma.module.css";
import "./calendario.css";
import Legenda from "./legenda";
import { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";

interface MembroEquipe {
    id: number;
    nome: string;
    cor: string;
}

interface Cronograma {
    tarefa: string;
    id: number;
    data: string | Date;
    equipe_id: number;
    imprevisto: boolean;
}

interface CalendarioProps {
    cronogramas: Cronograma[];
    equipes: MembroEquipe[];
}

// Transforma uma data em "2026-08-13", para comparar o dia sem comparar objetos Date.
const formatarData = (data: string | Date) => {
    if (typeof data === "string") return data.slice(0, 10);

    return data.toISOString().slice(0, 10);
};

const Calendario = ({ cronogramas, equipes }: CalendarioProps) => {
    const [modal, abrirModal] = useState<Date>();
    const [dadosDoDia, setDadosDoDia] = useState<Cronograma[]>([]);

    const cronogramaAmarelo = cronogramas.filter((p) => p.equipe_id === 1 && !p.imprevisto);
    const cronogramaAzul = cronogramas.filter((p) => p.equipe_id === 2 && !p.imprevisto);
    const cronogramaVermelha = cronogramas.filter((p) => p.equipe_id === 3 && !p.imprevisto);
    const cronogramaVerde = cronogramas.filter((p) => p.equipe_id === 4 && !p.imprevisto);
    const cronogramaImprevisto = cronogramas.filter((p) => p.imprevisto);

    const redDays = cronogramaVermelha.map((item) => new Date(`${formatarData(item.data)}T12:00:00`));
    const greenDays = cronogramaVerde.map((item) => new Date(`${formatarData(item.data)}T12:00:00`));
    const blueDays = cronogramaAzul.map((item) => new Date(`${formatarData(item.data)}T12:00:00`));
    const yellowDays = cronogramaAmarelo.map((item) => new Date(`${formatarData(item.data)}T12:00:00`));
    const grayDays = cronogramaImprevisto.map((item) => new Date(`${formatarData(item.data)}T12:00:00`));

    // As cores do calendário ficam todas aqui para você alterar facilmente.
    const modifiers = {
        red: redDays,
        green: greenDays,
        yellow: yellowDays,
        blue: blueDays,
        gray: grayDays,
    };

    const modifiersStyles = {
        red: { backgroundColor: "#fee2e2", color: equipes[2]?.cor ?? "#ef4444", borderRadius: "16px" },
        green: { backgroundColor: "#e7f7ed", color: equipes[3]?.cor ?? "#22c55e", borderRadius: "16px" },
        yellow: { backgroundColor: "#e3e4c3", color: equipes[0]?.cor ?? "#ca8a04", borderRadius: "16px" },
        blue: { backgroundColor: "#c9f8f9", color: equipes[1]?.cor ?? "#3b82f6", borderRadius: "16px" },
        gray: { backgroundColor: "#e5e7eb", color: "#4b5563", borderRadius: "16px" },
    };

    const selecionarDia = (dataSelecionada: Date | undefined) => {
        abrirModal(dataSelecionada);

        if (!dataSelecionada) {
            setDadosDoDia([]);
            return;
        }

        const diaSelecionado = formatarData(dataSelecionada);
        const tarefasDoDia = cronogramas.filter((p) => formatarData(p.data) === diaSelecionado);
        setDadosDoDia(tarefasDoDia);
    };

    const fecharModal = () => {
        abrirModal(undefined);
        setDadosDoDia([]);
    };

    return (
        <section className={styles.principal}>
            <DayPicker
                endMonth={new Date(2026, 11, 1)}
                mode="single"
                navLayout="around"
                startMonth={new Date(2026, 0, 1)}
                timeZone="America/Sao_Paulo"
                locale={ptBR}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                animate
                selected={modal}
                onSelect={selecionarDia}
            />
            <footer className={styles.legenda}>
                <h3>Legendas</h3>
                <div className={styles.legendaContainer}>
                    {equipes.map((equipe) => (
                        <Legenda key={equipe.id} texto={`Eq. ${equipe.nome}`} cor={equipe.cor} />
                    ))}
                    <Legenda texto="Sem Aula" cor="#ffffff" />
                    <Legenda texto="Imprevisto" cor="gray" />
                </div>
            </footer>

            {modal && (
                <div className={styles.modal}>
                    <header>
                        <h3>{new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long" }).format(modal)}</h3>
                        <button type="button" className={styles.modalClose} onClick={fecharModal} aria-label="Fechar modal">
                            <MdClose />
                        </button>
                    </header>

                    {dadosDoDia.length < 1 ? (
                        <>
                            <h4>Sem aula</h4>
                            <p>Não há nada agendado para este dia.</p>
                        </>
                    ) : (
                        dadosDoDia.map((tarefa) => {
                            const equipe = equipes.find((e) => e.id === tarefa.equipe_id);

                            return (
                                <Fragment key={tarefa.id}>
                                    
                                    <h4>{tarefa.imprevisto && <>Imprevisto na</>} Tarefa do dia</h4>
                                    <p>{tarefa.tarefa}</p>
                                    <footer>
                                        <div className={styles.footerTitulo} style={{ backgroundColor: tarefa.imprevisto ? "gray" : '' }}>
                                            {tarefa.imprevisto ? "Imprevisto na Equipe:" : "Equipe Responsável: "}
                                        </div>
                                        <div style={{ backgroundColor: equipe?.cor }} className={styles.footerEquipe}>
                                            {`Equipe ${equipe?.nome}`}
                                        </div>
                                    </footer>
                                </Fragment>
                            );
                        })
                    )}
                </div>
            )}
        </section>
    );
};

export default Calendario;

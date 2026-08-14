"use client";
import { ptBR } from "react-day-picker/locale";
import { DayPicker } from "@daypicker/react"
import styles from "./cronograma.module.css";
import './calendario.css'
import Legenda from "./legenda"
import { useState } from "react";
import { MdClose } from "react-icons/md"

const Calendario = () => {
    const [modal, abrirModal] = useState<Date>()
    // Exemplo de dias com cores personalizadas
    const redDays = [new Date(2026, 7, 10), new Date(2026, 7, 12)];
    const greenDays = [new Date(2026, 7, 15)];

    const modifiers = {
        red: redDays,
        green: greenDays,
    };

    const modifiersStyles = {
        red: { backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '16px' },
        green: { backgroundColor: '#dcfce7', color: '#22c55e', borderRadius: '16px' }
    };

    const fecharModal = () => {
        abrirModal(undefined)
    }
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
                onSelect={abrirModal}
            />
            <footer className={styles.legenda}>
                <h3>Legendas</h3>
                <div className={styles.legendaContainer}>
                    <Legenda texto="Eq. Amarela" cor="yellow" />
                    <Legenda texto="Eq. Preta" cor="#000000" />
                    <Legenda texto="Eq. Azul" cor="blue" />
                    <Legenda texto="Eq. Vermelha" cor="red" />
                    <Legenda texto="Sem Aula" cor="#ffffff" />
                    <Legenda texto="Imprevisto" cor="gray" />
                </div>
            </footer>
            {modal && (
                <>
                <div className={styles.fundoBlur}></div>
                <div className={styles.modal}>
                    <header>
                        <h3>{`${new Intl.DateTimeFormat("pt-BR", {day: "2-digit", month: "long"}).format(modal)}`}</h3>
                        <MdClose className={styles.modalClose} onClick={fecharModal}/>
                    </header>
                    <h4>Tarefa do dia</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ea quae odio autem aut sunt aspernatur deleniti quo reprehenderit eveniet. Delectus, dolore earum! Tempore dolores atque, quia expedita cum ut.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. A quasi accusantium delectus est distinctio aperiam consequuntur aliquid in itaque quo laboriosam doloremque nostrum unde minima iste consectetur, facere molestiae hic.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis doloribus ea possimus, ad quam quasi perferendis? Quasi dolorem quibusdam vero enim! Accusamus illo odio illum quos quae repellat ex magnam?
                    </p>
                    <footer>
                        <h4>Responsáveis</h4>
                        <div
                        style={{
                            backgroundColor: "#377ffc"
                        }}>
                            Equipe Azul
                        </div>
                    </footer>
                </div>
            </>
            )}
        </section>
    );
};

export default Calendario;

import Navegacao from "./Navegacao"

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Navegacao />
            {children}
        </main>
    );
}
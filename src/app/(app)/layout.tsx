import Navbar from "@/components/navbar/Navbar"
import Header from "@/components/header/Header"
import "@daypicker/react/style.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Navbar />
        </>
    );
}

import type { Metadata } from "next";
import { Quicksand, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import "@daypicker/react/style.css";
import { ToastContainer } from "react-toastify"

const quickSand = Quicksand({
  variable: "--font-quicksand"
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Horta - 3DSA2026",
  description: "Site para gerenciar os posts e o cronograma da horta do 3DSA 2026 da Etec Jardim Angela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${quickSand.variable} ${beVietnamPro.variable}`} >
      <body>
        <div className="app-shell">
          {children}
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}

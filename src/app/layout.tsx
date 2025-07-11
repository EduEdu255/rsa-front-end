// src/app/layout.tsx
"use client"; // <--- ADICIONE ESTA LINHA AQUI!

import './globals.css';
import React, { useState } from 'react'; // Importe useState
import { Header } from '../components/common/Header'; // Importe a Header
import { BottomNavBar } from '../components/common/BottomNavBar'; // Importe a BottomNavBar
import { SideMenu } from '../components/common/SideMenu'; // Importe a SideMenu

// Você pode remover a importação de 'Inter' se não estiver usando a fonte globalmente,
// mas vou mantê-la aqui por segurança se ela estiver no seu projeto original.
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Estado para controlar a visibilidade do menu lateral
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // 2. Funções para abrir e fechar o menu
  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);

  return (
    <html lang="pt-BR">
      <body>
        <div className="bg-gray-100 min-h-screen flex flex-col"> {/* Adicione um container principal */}
          {/* Header persistente em todas as páginas */}
          <Header isLoggedIn={false} /> {/* Ajuste 'isLoggedIn' conforme sua lógica de autenticação */}

          <main className="flex-grow pb-20"> {/* main que contém o conteúdo da página */}
            {children} {/* Aqui é onde o conteúdo da página atual será renderizado */}
          </main>

          {/* BottomNavBar persistente em todas as páginas, com o botão de menu */}
          <BottomNavBar onMenuOpen={openSideMenu} />

          {/* SideMenu que será controlado pelo estado */}
          <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
        </div>
      </body>
    </html>
  );
}
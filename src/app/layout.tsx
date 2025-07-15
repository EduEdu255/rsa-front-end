// src/app/layout.tsx
"use client"; // ESSENCIAL: Permite usar hooks de cliente como useState

import './globals.css';
import React, { useState } from 'react'; // Importe useState
import { Header } from '../components/common/Header'; // Importe a Header
import { BottomNavBar } from '../components/common/BottomNavBar'; // Importe a BottomNavBar
import { SideMenu } from '../components/common/SideMenu'; // Importe a SideMenu
// import { Inter } from 'next/font/google'; // Removido se não estiver usando
// const inter = Inter({ subsets: ['latin'] }); // Removido se não estiver usando


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
        {/* Container principal do layout para flexbox e fundo */}
        <div className="bg-gray-100 min-h-screen flex flex-col"> 
          {/* Header persistente em todas as páginas */}
          {/* A Header não precisa mais de onMenuClick, pois o botão está na BottomNavBar */}
          <Header isLoggedIn={false} /> 

          {/* main que contém o conteúdo da página, cresce para preencher o espaço */}
          <main className="flex-grow pb-20"> 
            {children} {/* Aqui é onde o conteúdo da página atual será renderizado */}
          </main>

          {/* BottomNavBar persistente em todas as páginas, com o botão de menu */}
          {/* IMPORTANTE: Passar a prop onMenuOpen para a BottomNavBar */}
          <BottomNavBar onMenuOpen={openSideMenu} /> 

          {/* SideMenu que será controlado pelo estado */}
          <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
        </div>
      </body>
    </html>
  );
}

"use client";

import './globals.css';
import React, { useState } from 'react';
import Header from '../components/common/Header';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { SideMenu } from '../components/common/SideMenu';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);

  return (
    <html lang="pt-BR">
      <body>
        <div className="bg-gray-100 min-h-screen flex flex-col">

          <Header />

          <main className="flex-grow pb-20">
            {children}
          </main>

          <BottomNavBar onMenuOpen={openSideMenu} />

          <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
        </div>
      </body>
    </html>
  );
}
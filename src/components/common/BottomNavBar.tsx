// src/components/common/BottomNavBar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface BottomNavBarProps {
  onMenuOpen: () => void; // <-- Nova prop: função para abrir o menu
}

export function BottomNavBar({ onMenuOpen }: BottomNavBarProps) { // Recebe a nova prop
  const pathname = usePathname();

  const navItems = [
    { name: 'Suporte', type: 'image', src: '/SuportIcon.svg', href: '/suporte' },
    { name: 'Carteira', type: 'image', src: '/CarteiraIcon.svg', href: '/carteira' },
    { name: 'Apostar', type: 'image', src: '/dolar.svg', href: '/jbmodalidade' },
    { name: 'Resultados', type: 'image', src: '/ResultadosIcon.svg', href: '/resultados' },
    { name: 'Menu', type: 'image', src: '/MenuIcon.svg', href: '/menu', isSpecialButton: true }, // Marcador para o botão de menu
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 primary-bg-container text-secondary p-2 flex justify-around items-center rounded-top-[25] z-50 h-20">
      {navItems.map((item) => (
        <React.Fragment key={item.name}>
          {item.isSpecialButton ? (
            // Se for o botão 'Menu', usa um botão normal com onClick
            <button
              onClick={onMenuOpen} // Chama a função passada via prop
              className={`flex flex-col items-center text-xs ${pathname === item.href ? 'text-yellow-300' : ''}`}
            >
              <img src={item.src} alt={item.name} className="w-6 h-6" />
              <span>{item.name}</span>
            </button>
          ) : (
            // Para os outros itens, mantém o Link normal
            <Link href={item.href} className={`flex flex-col items-center text-xs ${pathname === item.href ? 'text-yellow-300' : ''}`}>
              <img src={item.src} alt={item.name} className="w-6 h-6" />
              <span>{item.name}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
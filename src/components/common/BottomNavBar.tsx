
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface BottomNavBarProps {
  onMenuOpen: () => void; 
}

export function BottomNavBar({ onMenuOpen }: BottomNavBarProps) { 
  const pathname = usePathname();

  const navItems = [
    { name: 'Suporte', type: 'image', src: '/SuportIcon.svg', href: '/suporte' },
    { name: 'Carteira', type: 'image', src: '/CarteiraIcon.svg', href: '/perfil' },
    { name: 'Apostar', type: 'image', src: '/dolar.svg', href: '/jbmodalidade' },
    { name: 'Resultados', type: 'image', src: '/ResultadosIcon.svg', href: '/jbresultados' }, 
    { name: 'Menu', type: 'image', src: '/MenuIcon.svg', href: '#', isSpecialButton: true }, 
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 primary-bg-container text-secondary p-2 flex justify-around items-center rounded-top-[25] z-50 h-20">
      {navItems.map((item) => (
        <React.Fragment key={item.name}>
          {item.isSpecialButton ? (
           
            <button
              onClick={onMenuOpen} 
              className={`flex flex-col items-center text-xs ${pathname === item.href ? 'text-yellow-300' : ''}`}
            >
              <img src={item.src} alt={item.name} className="w-6 h-6" />
              <span>{item.name}</span>
            </button>
          ) : (
            
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
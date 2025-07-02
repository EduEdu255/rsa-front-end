'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image'; 



export function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [

    { name: 'Suporte', type: 'image', src: '/SuportIcon.svg', href: '/suporte' }, 
    { name: 'Carteira', type: 'image', src: '/CarteiraIcon.svg', href: '/carteira' },
    { name: 'Apostar', type: 'emoji', text: '', href: '/apostar' },
    { name: 'Resultados', type: 'image', src: '/ResultadosIcon.svg', href: '/resultados' },
    { name: 'Menu', type: 'image', src: '/MenuIcon.svg', href: '/menu' },
  ];

  return (
    
    <nav className="fixed bottom-0 left-0 right-0 bg-purple-800 text-white p-2 flex justify-around items-center rounded-top-[25] z-50 h-20">
        
      {navItems.map((item) => (
        <Link key={item.name} href={item.href} className={`flex flex-col items-center text-xs ${pathname === item.href ? 'text-yellow-300' : ''}`}>
     
          {item.type === 'image' ? (
           
            <img src={item.src} alt={item.name} className="w-6 h-6" /> 
        
          ) : (
            
            <span className="text-xl">{item.text}</span>
          )}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
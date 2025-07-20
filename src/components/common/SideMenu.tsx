
import React from 'react';
import Link from 'next/link';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void; 
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <>
 
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={onClose} 
        ></div>
      )}

   
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} 
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 absolute top-4 left-4" 
            aria-label="Fechar Menu"
          >
            &times; 
          </button>

          <h2 className="text-2xl font-bold text-purple-900 mb-6 mt-16">Menu</h2> 
          
          <nav className="space-y-4">
            <Link href="/" passHref>
              <div onClick={onClose} className="block text-lg text-black hover:text-primary transition-colors duration-200 cursor-pointer">
                Início
              </div>
            </Link>
            <Link href="/perfil" passHref>
              <div onClick={onClose} className="block text-lg text-black hover:text-primary transition-colors duration-200 cursor-pointer">
                Minha Carteira
              </div>
            </Link>
            <Link href="/jbresultados" passHref> 
              <div onClick={onClose} className="block text-lg text-black hover:text-primary transition-colors duration-200 cursor-pointer">
                Resultados JB
              </div>
            </Link>
            <Link href="/login" passHref>
              <div onClick={onClose} className="block text-lg text-black hover:text-primary transition-colors duration-200 cursor-pointer">
                Login / Cadastro
              </div>
            </Link>
   
          </nav>
        </div>
      </div>
    </>
  );
}
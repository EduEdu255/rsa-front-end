// src/app/login/page.tsx
"use client"; // Mantenha esta linha no topo do arquivo!

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [cpf, setCpf] = useState<string>('');

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    let value = e.target.value.replace(/\D/g, '');

    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (value.length > 3 && value.length <= 6) {
      
      value = value.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (value.length > 6 && value.length <= 9) {
      
      value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length > 9) {
      
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }

    setCpf(value); 
  };

  return (
    <div className="min-h-screen primary-bg-container flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-foreground rounded-[20px] shadow-lg p-6 space-y-6 flex flex-col items-center">
        <div className="relative w-28 h-28 mb-4">
          <Image
            src="/images/Logo.webp"
            alt="H2bicho Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        <input
          type="text"
          placeholder="CPF"
          value={cpf} // O valor do input é controlado pelo estado `cpf`
          onChange={handleCpfChange} // Chama nossa função de manipulação e formatação
          inputMode="numeric" // Continua sugerindo o teclado numérico em celulares
          className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
        />

        <Link href={"/home"} passHref className='w-full'>
          <button className="w-full button-bg-withe text-text-light font-bold py-3 rounded-lg hover:bg-secondary transition-colors duration-300">
            Entrar
          </button>
        </Link>

        <Link href="/register" passHref className="w-full">
          <button className="w-full border-input text-text-light font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300">
            Criar conta
          </button>
        </Link>
      </div>
    </div>
  );
}
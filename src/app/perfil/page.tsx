
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image'; 
import Link from 'next/link'; 

export default function PerfilPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('Usuário'); 
  const [balance, setBalance] = useState<string>('0,00'); 
  const [cpf, setCpf] = useState<string>('123.456.789-00');
  const [phoneNumber, setPhoneNumber] = useState<string>('(88) 99940-5010');

 
  const loadProfileData = () => {
    if (typeof window !== 'undefined') {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }
      const storedCpf = localStorage.getItem('userCpf'); 
      if (storedCpf) setCpf(storedCpf);

      const storedPhone = localStorage.getItem('userPhone'); 
      if (storedPhone) setPhoneNumber(storedPhone);

      const storedBalance = localStorage.getItem('userBalance');
      if (storedBalance) {
        setBalance(storedBalance);
      } else {
        
        localStorage.setItem('userBalance', '0,00');
        setBalance('0,00');
      }
    }
  };

  useEffect(() => {
    loadProfileData();


    const handleBalanceUpdate = (event: Event) => {
      
      if (event instanceof CustomEvent && event.detail && event.detail.newBalance) {
        setBalance(event.detail.newBalance);
      } 
      
      else if (event instanceof StorageEvent && event.key === 'userBalance') {
        setBalance(event.newValue || '0,00');
      }
    };

    window.addEventListener('storage', handleBalanceUpdate);
    window.addEventListener('balanceUpdate', handleBalanceUpdate as EventListener); 

    return () => {

      window.removeEventListener('storage', handleBalanceUpdate);
      window.removeEventListener('balanceUpdate', handleBalanceUpdate as EventListener);
    };
    
  }, []); 

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userCpf');
      localStorage.removeItem('userPhone');
      localStorage.removeItem('userBalance'); 
      
      router.push('/login'); 
    }
  };

  return (
    <div className="min-h-screen primary-bg-container  flex flex-col items-center p-4">
      <div className="text-primary flex items-center justify-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-secondary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
          ←
        </button>
        <h1 className="text-secondary text-4xl md:text-3xl font-bold">Perfil</h1>
      </div>
  
      <div className="w-full max-w-md div-bg rounded-[20px] shadow-lg p-6 space-y-6 flex flex-col items-center mt-8">
        <div className="flex items-center space-x-4 w-full">
          <div className="bg-secondary rounded-full p-4">
            <Image src="/PerfilIcon.svg" alt="Ícone de Perfil" width={40} height={40} />
          </div>
          <div className="text-text-dark">
            <p className="text-xl text-primary font-bold">Olá, {userName}!</p>
           
            <p className="text-lg font-bold text-black  mt-2">Saldo: R$ {balance}</p>
            <p className="text-sm text-black ">CPF: {cpf}</p>
            <p className="text-sm text-black ">Número: {phoneNumber}</p>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4 w-full mt-6">
          <Link href="/depositar" passHref className="w-full">
            <button className="button-bg-withe text-text-light font-bold py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-300 w-full">
              Depositar
            </button>
          </Link>
          <Link href="/sacar" passHref className="w-full">
            <button className="button-bg-withe text-text-light font-bold py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-300 w-full">
              Sacar
            </button>
          </Link>
          <Link href="/trocar-senha" passHref className="w-full">
            <button className="button-bg-withe text-text-light font-bold py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-300 w-full">
              Trocar senha
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="button-bg-withe text-text-light font-bold py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-300 w-full"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
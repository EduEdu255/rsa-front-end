"use client"; 

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [cpf, setCpf] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 


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

 
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
   
    if (value.length > 2 && value.length <= 7) {
        value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else if (value.length > 7) {
        value = value.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    }
   
    if (value.length > 15) { 
      value = value.slice(0, 15);
    }
    setPhoneNumber(value);
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  
  const handleSubmit = () => {
    const cleanCpf = cpf.replace(/\D/g, ''); 
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, ''); 

   
    if (cleanCpf.length !== 11) {
      alert('CPF inválido! O CPF deve conter 11 dígitos.');
      return;
    }

    
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

   
    console.log('Dados para cadastro:', {
      cpf: cleanCpf,
      phoneNumber: cleanPhoneNumber,
      password: password,
    });
  
  };

  return (
    <div className="min-h-screen primary-bg-container flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm div-bg rounded-[20px] shadow-lg p-6 space-y-6 flex flex-col items-center">
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
          value={cpf}
          onChange={handleCpfChange}
          inputMode="numeric"
          className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
        />

       
        <input
          type="text" 
          placeholder="Número"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          inputMode="numeric" 
          className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
        />

     
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
          
          className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
        />

      
        <Link href="/login" passHref className="w-full">
          <button
          onClick={handleSubmit} 
          className="w-full button-bg-withe text-text-light font-bold py-3 rounded-lg hover:bg-secondary transition-colors duration-300"
        >
          Cadastrar
        </button>

        </Link>
        
        
        <Link href="/login" passHref className="w-full">
          <button className="w-full border-input text-text-light font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300">
            Já tenho uma conta
          </button>
        </Link>
      </div>
    </div>
  );
}
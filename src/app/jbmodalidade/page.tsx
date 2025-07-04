// src/app/jogo-do-bicho/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Header } from '../../components/common/Header';
import { BottomNavBar } from '../../components/common/BottomNavBar';
import { GameModeCard } from '../../components/modalidades/GameModeCard';

export default function JogoDoBichoPage() {
  const router = useRouter();

  const handleCardClick = (mode: string) => {
    console.log(`Modo ${mode} clicado!`);
  };

  return (
    <div className="flex flex-col min-h-screen secondary-bg-container text-foreground">
  
      <Header />

      <main className="flex-grow relative overflow-hidden">
      
        <div className="absolute inset-0 striped-background"></div>


        <div className="relative flex-row items-center z-10 w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8  min-h-[calc(100vh-120px)] rounded-lg  shadow-lg my-4">

          <div className="flex items-center justify-center  gap-4 mb-6">
            <button
              onClick={() => router.back()}
   
              className="text-foreground border-2  text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="Voltar"
            >
             ←
            </button>

            <h1 className="text-foreground text-primary text-4xl md:text-3xl font-bold">Jogo do Bicho</h1>
          </div>

 
          <div className="mb-6">

            <p className="text-foreground text-lg md:text-xl text-primary font-bold mb-1">Modalidade:</p>
           
            <p className="text-foreground text-sm text-primary md:text-base">Escolha a modalidade de jogo.</p>
          </div>


          <div className="space-y-4 ">
            <GameModeCard mode="Grupo" payout="1 X R$18,00" onClick={() => handleCardClick('Grupo')} />
            <GameModeCard mode="Milhar" payout="1 X R$6.000,00" onClick={() => handleCardClick('Milhar')} />
            <GameModeCard mode="Centena" payout="1 X R$600,00" onClick={() => handleCardClick('Centena')} />
            <GameModeCard mode="Dezena" payout="1 X R$60,00" onClick={() => handleCardClick('Dezena')} />
            
            <GameModeCard mode="Grupo" payout="1 X R$18,00" onClick={() => handleCardClick('Grupo')} />
            <GameModeCard mode="Milhar" payout="1 X R$6.000,00" onClick={() => handleCardClick('Milhar')} />
            <GameModeCard mode="Centena" payout="1 X R$600,00" onClick={() => handleCardClick('Centena')} />
            <GameModeCard mode="Dezena" payout="1 X R$60,00" onClick={() => handleCardClick('Dezena')} />

            <GameModeCard mode="Grupo" payout="1 X R$18,00" onClick={() => handleCardClick('Grupo')} />
            <GameModeCard mode="Milhar" payout="1 X R$6.000,00" onClick={() => handleCardClick('Milhar')} />
            <GameModeCard mode="Centena" payout="1 X R$600,00" onClick={() => handleCardClick('Centena')} />
            <GameModeCard mode="Dezena" payout="1 X R$60,00" onClick={() => handleCardClick('Dezena')} />
            
            <GameModeCard mode="Grupo" payout="1 X R$18,00" onClick={() => handleCardClick('Grupo')} />
            <GameModeCard mode="Milhar" payout="1 X R$6.000,00" onClick={() => handleCardClick('Milhar')} />
            <GameModeCard mode="Centena" payout="1 X R$600,00" onClick={() => handleCardClick('Centena')} />
            <GameModeCard mode="Dezena" payout="1 X R$60,00" onClick={() => handleCardClick('Dezena')} />

                 
          </div>
        </div>
      </main>

 
      <BottomNavBar />
    </div>
  );
}
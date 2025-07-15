
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import { Header } from '../../components/common/Header';
import { BottomNavBar } from '../../components/common/BottomNavBar';
import { GameModeCard } from '../../components/modalidades/GameModeCard';

export default function JogoDoBichoPage() {
  const router = useRouter();

  const handleCardClick = (mode: string) => {
    const encodedMode = encodeURIComponent(mode);
    router.push(`/jbanimais?modalidade=${encodedMode}`);
  };

  const gameModes = [
    { mode: "CENTENA", payout: "800x" },
    { mode: "CENTENA INV", payout: "800x" },
    { mode: "MILHAR", payout: "8.000x" },
    { mode: "MILHAR E CT", payout: "8.000x" },
    { mode: "MILHAR INV", payout: "8.000x" },
    { mode: "UNIDADE", payout: "8x" },
    { mode: "DEZENA", payout: "80x" },
    { mode: "DUQUE DEZ", payout: "300x" },
    { mode: "TERNO DEZ SECO", payout: "10.000x" },
    { mode: "TERNO DEZ", payout: "5.000x" },
    { mode: "GRUPO", payout: "20x" },
    { mode: "DUQUE GP", payout: "180x" },
    { mode: "TERNO GP", payout: "1.500x" },
    { mode: "QUADRA GP", payout: "1.000x" },
    { mode: "QUINA GP 8/5", payout: "1.000x" },
    { mode: "SENA GP 10/6", payout: "1.000x" },
    { mode: "PASSE VAI", payout: "100x" },
    { mode: "PASSE VAI VEM", payout: "45x" },
    { mode: "PALPITAO", payout: "800x" },
  ];

  return (
    <div className="flex flex-col min-h-screen secondary-bg-container text-foreground">

      <Header isLoggedIn={true} />

      <main className="flex-grow relative overflow-hidden">

        <div className="absolute inset-0 striped-background"></div>

        <div className="relative flex-row items-center z-10 w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8 min-h-[calc(100vh-120px)] rounded-lg shadow-lg my-4">

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="text-foreground text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="Voltar"
            >
              ←
            </button>
            <h1 className="text-foreground text-primary text-4xl md:text-3xl font-bold">Jogo do Bicho</h1>
          </div>

          <div className="mb-6">
            <p className=" text-lg md:text-xl text-primary font-bold mb-1">Modalidade:</p>
            <p className="text-sm text-black md:text-base">Escolha a modalidade de jogo.</p>
          </div>

          <div className="space-y-4 ">
            {gameModes.map((game, index) => (
              <GameModeCard
                key={index}
                mode={game.mode}
                payout={game.payout}
                onClick={() => handleCardClick(game.mode)}
              />
            ))}
          </div>
        </div>
      </main>

      
    </div>
  );
}
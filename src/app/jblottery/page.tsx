// src/app/jblottery/page.tsx (ou o caminho que você preferir para esta nova tela)
"use client"; // Mantenha esta linha no topo!

import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNavBar } from '../../components/common/BottomNavBar';
import { useRouter } from 'next/navigation';

export default function SelectLotteryPage() {
  const router = useRouter();
  const [selectedLottery, setSelectedLottery] = useState<string | null>(null); // Estado para a loteria selecionada

  // Mova a constante 'loterias' para AQUI DENTRO do componente
  const loterias = {
    Nacional: [
      { id: 'lt-nacional-23hs', name: 'LT Nacional 23HS' },
      { id: 'lt-maluca-nacional-23hs', name: 'LT Maluca/Nacional 23HS' },
    ],
    'Look/Goias': [
      { id: 'lt-look-21hs', name: 'LT Look 21HS' },
      { id: 'lt-maluca-look-23hs', name: 'LT Maluca/Look 23HS' },
    ],
  };

  const handleApostarClick = () => {
    if (selectedLottery) {
      console.log(`Apostar na loteria: ${selectedLottery}`);
      // Aqui você adicionaria a lógica para processar a aposta
      // Ex: navegar para uma página de confirmação, enviar para uma API, etc.
      // router.push('/confirmacao-aposta');
    } else {
      alert('Por favor, selecione uma loteria antes de apostar.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="flex-grow relative overflow-hidden">
        {/* Fundo listrado */}
        <div className="absolute inset-0 striped-background"></div>

        {/* Container Central do Conteúdo */}
        <div className="relative z-10 w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8 content-area-bg rounded-lg shadow-lg my-4">
          {/* Seção de Voltar e Título */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="Voltar"
            >
              ←
            </button>
            <h1 className="text-primary text-2xl md:text-3xl font-bold">Jogo do Bicho</h1>
          </div>

          {/* Título da Seção de Loterias */}
          <h2 className="text-foreground text-xl md:text-2xl font-bold mb-4">Selecione as loterias:</h2>

          {/* Seção de Rádio Buttons de Loterias */}
          <div className="space-y-6 mb-8"> {/* Espaço entre os grupos de loterias */}
            {Object.entries(loterias).map(([groupName, groupOptions]) => (
              <div key={groupName}>
                <p className="text-foreground text-lg md:text-xl font-bold mb-3">{groupName}</p>
                <div className="space-y-3">
                  {groupOptions.map((lottery) => (
                    <label key={lottery.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="lotterySelection" // Mesmo 'name' para tornar os rádios exclusivos
                        value={lottery.id}
                        checked={selectedLottery === lottery.id}
                        onChange={() => setSelectedLottery(lottery.id)}
                        className="hidden" // Esconde o rádio button padrão
                      />
                      {/* Estilo do rádio button customizado */}
                      <span
                        className={`
                          w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200
                          ${selectedLottery === lottery.id ? 'border-primary bg-primary' : 'border-gray-400 bg-white'}
                        `}
                      >
                        {selectedLottery === lottery.id && (
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                        )}
                      </span>
                      <span className="text-foreground text-base">{lottery.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Botão Apostar */}
          <button
            onClick={handleApostarClick}
            className="w-full bg-primary text-background font-bold py-4 rounded-lg text-xl hover:opacity-90 transition-opacity duration-200 shadow-lg"
          >
            Apostar
          </button>

        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
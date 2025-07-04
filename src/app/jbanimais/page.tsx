// src/app/animals-grid/page.tsx
"use client"; 

import React from 'react';
import { Header } from '../../components/common/Header';
import { BottomNavBar } from '../../components/common/BottomNavBar';
import { AnimalCard } from '../../components/animais/AnimalCard';
import { useRouter } from 'next/navigation'; 


const animalData = [
  { id: 1, imageSrc: '/images/logo.webp', numbers: '1 2 3 4' },
  { id: 2, imageSrc: '/images/JogoDoBichoIMG.webp', numbers: '5 6 7 8' },
  { id: 3, imageSrc: '/images/donkey.jpg', numbers: '9 10 11 12' },
  { id: 4, imageSrc: '/images/butterfly.jpg', numbers: '13 14 15 16' },
  { id: 1, imageSrc: '/images/ostrich.jpg', numbers: '1 2 3 4' },
  { id: 2, imageSrc: '/images/eagle.jpg', numbers: '5 6 7 8' },
  { id: 3, imageSrc: '/images/donkey.jpg', numbers: '9 10 11 12' },
  { id: 4, imageSrc: '/images/butterfly.jpg', numbers: '13 14 15 16' },
  { id: 1, imageSrc: '/images/ostrich.jpg', numbers: '1 2 3 4' },
  { id: 2, imageSrc: '/images/eagle.jpg', numbers: '5 6 7 8' },
  { id: 3, imageSrc: '/images/donkey.jpg', numbers: '9 10 11 12' },
  { id: 4, imageSrc: '/images/butterfly.jpg', numbers: '13 14 15 16' },
  { id: 1, imageSrc: '/images/ostrich.jpg', numbers: '1 2 3 4' },
  { id: 2, imageSrc: '/images/eagle.jpg', numbers: '5 6 7 8' },
  { id: 3, imageSrc: '/images/donkey.jpg', numbers: '9 10 11 12' },
  { id: 4, imageSrc: '/images/butterfly.jpg', numbers: '13 14 15 16' },
  { id: 1, imageSrc: '/images/ostrich.jpg', numbers: '1 2 3 4' },
  { id: 2, imageSrc: '/images/eagle.jpg', numbers: '5 6 7 8' },
  { id: 3, imageSrc: '/images/donkey.jpg', numbers: '9 10 11 12' },
  { id: 4, imageSrc: '/images/butterfly.jpg', numbers: '13 14 15 16' },
  { id: 1, imageSrc: '/images/ostrich.jpg', numbers: '1 2 3 4' },
  { id: 2, imageSrc: '/images/eagle.jpg', numbers: '5 6 7 8' },
  { id: 3, imageSrc: '/images/donkey.jpg', numbers: '9 10 11 12' },
  { id: 4, imageSrc: '/images/butterfly.jpg', numbers: '13 14 15 16' },
];

export default function AnimalGridPage() {
  const router = useRouter();
  const handleCardClick = (mode: string) => {
    console.log(`Modo ${mode} clicado!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      <Header />

      {/* Conteúdo Principal da Grade */}
      <main className="flex-grow relative overflow-hidden">
        {/* Fundo listrado */}
        <div className="absolute inset-0 striped-background"></div>

        {/* Container Central do Conteúdo (Voltar, Título, Modalidade) */}
        {/* Adicionei um container para agrupar o cabeçalho da página e o texto da modalidade */}
        <div className="relative z-10 w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8 content-area-bg rounded-lg shadow-lg my-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="text-foreground border-2 text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="Voltar"
            >
              ←
            </button>
            {/* Notei que você colocou text-foreground e text-primary no mesmo elemento.
                O último prevalece. Se quiser a cor primária, remova text-foreground. */}
            <h1 className="text-primary text-4xl md:text-3xl font-bold">Jogo do Bicho</h1>
          </div>

          <div className="mb-6">
            {/* Mesma observação de cores aqui. Se quiser a cor primária, remova text-foreground. */}
            <p className="text-primary text-lg md:text-xl font-bold mb-1">Escolha o Animal:</p>
            <p className="text-primary text-sm md:text-base">Escolha os Animais.</p>
          </div>

          {/* Container da Grade de Animais */}
          <div className="grid grid-cols-4 gap-2 md:gap-3"> {/* Grade de 4 colunas com gap entre as cartas */}
            {animalData.map((animal, index) => (
              <AnimalCard
                key={index} // Melhor usar um ID único do animal, mas index serve para exemplo
                id={animal.id}
                imageSrc={animal.imageSrc}
                numbers={animal.numbers}
              />
            ))}
          </div>
        </div>
      </main>

   
      <BottomNavBar />
    </div>
  );
}
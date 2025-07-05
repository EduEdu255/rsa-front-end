"use client"; 

import React, { useState, Suspense } from 'react'; 
import { Header } from '../../components/common/Header';
import { BottomNavBar } from '../../components/common/BottomNavBar';
import { AnimalCard } from '../../components/animais/AnimalCard';
import { useRouter, useSearchParams } from 'next/navigation';


const animalData = [
  { id: 1, name: 'Avestruz', imageSrc: '/images/avestruz.webp', numbers: '01 02 03 04' },
  { id: 2, name: 'Águia', imageSrc: '/images/aguia.webp', numbers: '05 06 07 08' },
  { id: 3, name: 'Burro', imageSrc: '/images/burro.webp', numbers: '09 10 11 12' },
  { id: 4, name: 'Borboleta', imageSrc: '/images/borboleta.webp', numbers: '13 14 15 16' },
  { id: 5, name: 'Cachorro', imageSrc: '/images/cachorro.webp', numbers: '17 18 19 20' },
  { id: 6, name: 'Cabra', imageSrc: '/images/cabra.webp', numbers: '21 22 23 24' },
  { id: 7, name: 'Carneiro', imageSrc: '/images/carneiro.webp', numbers: '25 26 27 28' },
  { id: 8, name: 'Camelo', imageSrc: '/images/camelo.webp', numbers: '29 30 31 32' },
  { id: 9, name: 'Cobra', imageSrc: '/images/cobra.webp', numbers: '33 34 35 36' },
  { id: 10, name: 'Coelho', imageSrc: '/images/coelho.webp', numbers: '37 38 39 40' },
  { id: 11, name: 'Cavalo', imageSrc: '/images/cavalo.webp', numbers: '41 42 43 44' },
  { id: 12, name: 'Elefante', imageSrc: '/images/elefante.webp', numbers: '45 46 47 48' },
  { id: 13, name: 'Galo', imageSrc: '/images/galo.webp', numbers: '49 50 51 52' },
  { id: 14, name: 'Gato', imageSrc: '/images/gato.webp', numbers: '53 54 55 56' },
  { id: 15, name: 'Jacaré', imageSrc: '/images/jacare.webp', numbers: '57 58 59 60' },
  { id: 16, name: 'Leão', imageSrc: '/images/leao.webp', numbers: '61 62 63 64' },
  { id: 17, name: 'Macaco', imageSrc: '/images/macaco.webp', numbers: '65 66 67 68' },
  { id: 18, name: 'Porco', imageSrc: '/images/porco.webp', numbers: '69 70 71 72' },
  { id: 19, name: 'Pavão', imageSrc: '/images/pavao.webp', numbers: '73 74 75 76' },
  { id: 20, name: 'Peru', imageSrc: '/images/peru.webp', numbers: '77 78 79 80' },
  { id: 21, name: 'Touro', imageSrc: '/images/touro.webp', numbers: '81 82 83 84' },
  { id: 22, name: 'Tigre', imageSrc: '/images/tigre.webp', numbers: '85 86 87 88' },
  { id: 23, name: 'Urso', imageSrc: '/images/urso.webp', numbers: '89 90 91 92' },
  { id: 24, name: 'Veado', imageSrc: '/images/veado.webp', numbers: '93 94 95 96' },
  { id: 25, name: 'Vaca', imageSrc: '/images/vaca.webp', numbers: '97 98 99 00' },
];

function AnimalGridContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalidade = searchParams.get('modalidade');

  const [selectedAnimalIds, setSelectedAnimalIds] = useState<number[]>([]);

  const handleAnimalCardClick = (animalId: number, animalName: string) => {
    setSelectedAnimalIds(prevSelected => {
      if (prevSelected.includes(animalId)) {
        return prevSelected.filter(id => id !== animalId);
      } else {
        return [...prevSelected, animalId];
      }
    });
    console.log(`Animal ${animalName} (ID: ${animalId}) clicado para a modalidade: ${decodeURIComponent(modalidade || 'N/A')}`);
  };

  const handleProceedToLottery = () => {
    if (selectedAnimalIds.length === 0) {
      alert('Por favor, selecione pelo menos um animal para continuar.');
      return;
    }
    
    const selectedAnimalNames = selectedAnimalIds.map(id => {
      const animal = animalData.find(a => a.id === id);
      return animal ? animal.name : '';
    }).join(',');

    const encodedModalidade = encodeURIComponent(modalidade || '');
    const encodedSelectedAnimalIds = encodeURIComponent(selectedAnimalIds.join(','));
    const encodedSelectedAnimalNames = encodeURIComponent(selectedAnimalNames);
    
    router.push(
      `/jbpqd?modalidade=${encodedModalidade}&animalIds=${encodedSelectedAnimalIds}&animalNames=${encodedSelectedAnimalNames}`
    );
  };

  return (
    <>
      <Header isLoggedIn={true} />

      <main className="flex-grow relative overflow-hidden">
        <div className="absolute inset-0 striped-background"></div>

        <div className="relative z-10 w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8 content-area-bg rounded-lg shadow-lg my-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="text-foreground text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="Voltar"
            >
              ←
            </button>
            <h1 className="text-primary text-4xl md:text-3xl font-bold">Jogo do Bicho</h1>
          </div>

          <div className="mb-6">
            <p className="text-primary text-lg md:text-xl font-bold mb-1">
              Modalidade: <span className="text-black">{decodeURIComponent(modalidade || 'N/A')}</span>
            </p>
            <p className="text-black text-sm md:text-base">Escolha os Animais.</p>
            
            {selectedAnimalIds.length > 0 && (
                <p className="text-black text-sm mt-2">
                    Selecionados: {selectedAnimalIds.map(id => {
                        const animal = animalData.find(a => a.id === id);
                        return animal ? decodeURIComponent(animal.name) : '';
                    }).join(', ')}
                </p>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {animalData.map((animal) => (
              <AnimalCard
                key={animal.id}
                id={animal.id}
                imageSrc={animal.imageSrc}
                numbers={animal.numbers}
                onClick={() => handleAnimalCardClick(animal.id, animal.name)}
                isSelected={selectedAnimalIds.includes(animal.id)} 
              />
            ))}
          </div>
          
          <button
            onClick={handleProceedToLottery}
            className="w-full button-bg-withe text-background font-bold py-4 rounded-lg text-xl hover:opacity-90 transition-opacity duration-200 shadow-lg mt-6"
          >
            Continuar com {selectedAnimalIds.length} animal(is)
          </button>

        </div>
      </main>

      <BottomNavBar />
    </>
  );
}


export default function AnimalGridPage() {
  return (
    <Suspense fallback={<div>Carregando seleção de animais...</div>}>
      <AnimalGridContent />
    </Suspense>
  );
}
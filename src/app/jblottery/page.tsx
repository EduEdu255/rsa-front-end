"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react'; // Adicionado Suspense aqui
import { Header } from '../../components/common/Header';
import { BottomNavBar } from '../../components/common/BottomNavBar';
import { useRouter, useSearchParams } from 'next/navigation';

// Componente que contém toda a lógica e UI que usa useSearchParams
function SelectLotteryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const modalidadeParam = searchParams.get('modalidade');
  const animalIdsParam = searchParams.get('animalIds');
  const animalNamesParam = searchParams.get('animalNames');

  const modalidade = useMemo(() => modalidadeParam ? decodeURIComponent(modalidadeParam) : 'N/A', [modalidadeParam]);
  const selectedAnimalIds = useMemo(() => animalIdsParam ? animalIdsParam.split(',').map(Number) : [], [animalIdsParam]);
  const selectedAnimalNames = useMemo(() => animalNamesParam ? decodeURIComponent(animalNamesParam).split(',') : [], [animalNamesParam]);

  const [selectedLottery, setSelectedLottery] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dados recebidos da página anterior:');
    console.log('Modalidade:', modalidade);
    console.log('IDs de animais selecionados:', selectedAnimalIds);
    console.log('Nomes de animais selecionados:', selectedAnimalNames);
  }, [modalidade, selectedAnimalIds, selectedAnimalNames]); 

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

  const handleContinuarClick = () => {
    if (!selectedLottery) {
      alert('Por favor, selecione uma loteria antes de continuar.');
      return;
    }

    let selectedLotteryName = '';
    for (const group of Object.values(loterias)) {
      const found = group.find(lot => lot.id === selectedLottery);
      if (found) {
        selectedLotteryName = found.name;
        break;
      }
    }

    const queryParams = new URLSearchParams({
      modalidade: encodeURIComponent(modalidade),
      animalIds: encodeURIComponent(selectedAnimalIds.join(',')),
      animalNames: encodeURIComponent(selectedAnimalNames.join(',')),
      lotteryId: encodeURIComponent(selectedLottery),
      lotteryName: encodeURIComponent(selectedLotteryName),
    }).toString();

    // Observe que a rota está indo para /jbgame-details, então os parâmetros serão passados corretamente para lá.
    router.push(`/jbgame-details?${queryParams}`); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary">
      <Header isLoggedIn={true} />

      <main className="flex-grow relative overflow-hidden">
        <div className="absolute inset-0 striped-background"></div>

        <div className="relative z-10 w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8 content-area-bg rounded-lg shadow-lg my-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="Voltar"
            >
              ←
            </button>
            <h1 className="text-primary text-4xl md:text-3xl font-bold">Jogo do Bicho</h1>
          </div>

          <div className="mb-6">
            <p className="text-primary text-lg md:text-xl font-bold mb-1">
              Modalidade: <span className="text-black">{modalidade}</span>
            </p>
            {selectedAnimalNames.length > 0 && (
              <p className="text-primary text-md mt-1">
                Animais Selecionados: <span className="text-black">{selectedAnimalNames.join(', ')}</span>
              </p>
            )}
            <h2 className="text-primary text-xl md:text-2xl font-bold mb-4 mt-4">Selecione as loterias:</h2>
          </div>

          <div className="space-y-6 mb-8">
            {Object.entries(loterias).map(([groupName, groupOptions]) => (
              <div key={groupName}>
                <p className="text-primary text-lg md:text-xl font-bold mb-3">{groupName}</p>
                <div className="space-y-3">
                  {groupOptions.map((lottery) => (
                    <label key={lottery.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="lotterySelection"
                        value={lottery.id}
                        checked={selectedLottery === lottery.id}
                        onChange={() => setSelectedLottery(lottery.id)}
                        className="hidden"
                      />

                      <span
                        className={`
                          w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200
                          ${selectedLottery === lottery.id ? 'border-primary primary-bg-container' : 'border-gray-400 bg-white'}
                        `}
                      >
                        {selectedLottery === lottery.id && (
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                        )}
                      </span>
                      <span className="text-primary text-base">{lottery.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleContinuarClick}
            className="w-full button-bg-withe text-background font-bold py-4 rounded-lg text-xl hover:opacity-90 transition-opacity duration-200 shadow-lg"
          >
            Continuar
          </button>
        </div>
      </main>

      
    </div>
  );
}

// Este é o componente que será exportado como a página, envolvendo o conteúdo com Suspense
export default function SelectLotteryPage() {
  return (
    <Suspense fallback={<div>Carregando loterias...</div>}>
      <SelectLotteryContent />
    </Suspense>
  );
}
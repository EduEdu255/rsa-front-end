"use client";

import React, { useState, useEffect } from 'react'; 
import { Header } from '../../components/common/Header';
import { BottomNavBar } from '../../components/common/BottomNavBar';
import { useRouter, useSearchParams } from 'next/navigation'; 

export default function SelectLotteryPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); 


  const modalidadeParam = searchParams.get('modalidade');
  const animalIdsParam = searchParams.get('animalIds');
  const animalNamesParam = searchParams.get('animalNames');


  const modalidade = modalidadeParam ? decodeURIComponent(modalidadeParam) : 'N/A';
  const selectedAnimalIds = animalIdsParam ? animalIdsParam.split(',').map(Number) : [];
  const selectedAnimalNames = animalNamesParam ? decodeURIComponent(animalNamesParam).split(',') : [];


  const [selectedPosition, setSelectedPosition] = useState<string>('1º Prêmio');
  const [betAmount, setBetAmount] = useState<string>('0,00');
  const [selectedType, setSelectedType] = useState<string>('Todos');

 
  useEffect(() => {
    console.log('Modalidade recebida:', modalidade);
    console.log('IDs de animais selecionados:', selectedAnimalIds);
    console.log('Nomes de animais selecionados:', selectedAnimalNames);
  }, [modalidade, selectedAnimalIds, selectedAnimalNames]); 

  const formatCurrency = (value: string): string => {
    let cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length < 2) {
      cleanValue = cleanValue.padStart(2, '0');
    }
    let formatted = (parseInt(cleanValue, 10) / 100).toFixed(2).replace('.', ',');
    return formatted;
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setBetAmount(formatCurrency(rawValue));
  };

  const handleIncrementAmount = (increment: number) => {
    const currentCleanAmount = parseFloat(betAmount.replace(',', '.'));
    const newAmount = currentCleanAmount + increment;
    setBetAmount(formatCurrency(newAmount.toFixed(2).replace('.', '')));
  };

  
  const handleFinalContinue = () => {
 

    if (parseFloat(betAmount.replace(',', '.')) <= 0) {
      alert('Por favor, informe um valor de aposta válido.');
      return;
    }


    console.log('Dados finais da aposta:');
    console.log('Modalidade:', modalidade);
    console.log('Animais (IDs):', selectedAnimalIds);
    console.log('Animais (Nomes):', selectedAnimalNames);
    console.log('Posição:', selectedPosition);
    console.log('Valor da Aposta:', betAmount);
    console.log('Tipo de Aposta:', selectedType);

    const queryParams = new URLSearchParams({
      modalidade: encodeURIComponent(modalidade),
      animalIds: encodeURIComponent(selectedAnimalIds.join(',')),
      animalNames: encodeURIComponent(selectedAnimalNames.join(',')),
      position: encodeURIComponent(selectedPosition),
      betAmount: encodeURIComponent(betAmount),
      betType: encodeURIComponent(selectedType),
    }).toString();

     router.push(`/jblottery?${queryParams}`);


    

   
  };


  return (
    <div className="text-primary flex flex-col min-h-screen bg-background text-black">

      <Header isLoggedIn={true} />

      <main className="text-primary flex-grow relative overflow-hidden">
        <div className="text-primary absolute inset-0 striped-background"></div>

        <div className="text-primary relative z-10 w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8 content-area-bg rounded-lg shadow-lg my-4">
          <div className="text-primary flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="text-primary text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="Voltar"
            >
              ←
            </button>
            <h1 className="text-primary text-primary text-4xl md:text-3xl font-bold">Jogo do Bicho</h1>
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
            <h2 className="text-primary text-black text-xl md:text-2xl font-bold mb-4 mt-4">Posição, quantia e divisão</h2>
          </div>


          <div className="text-primary mb-6">
            <p className="text-primary text-black text-primary text-lg md:text-xl font-bold mb-3">Selecione a posição:</p>
            <div className="text-primary space-y-3">
              {['1º Prêmio', '1º ao 3º Prêmio', '1º ao 5º Prêmio', '1º ao 7º Prêmio'].map((position) => (
                <label key={position} className="text-primary flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="position"
                    value={position}
                    checked={selectedPosition === position}
                    onChange={() => setSelectedPosition(position)}
                    className="text-primary hidden"
                  />

                  <span
                    className={`
                      w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200
                      ${selectedPosition === position ? 'border-primary primary-bg-container' : 'border-gray-400 bg-white'}
                    `}
                  >
                    {selectedPosition === position && (
                      <span className="text-primary w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="text-primary text-black text-base">{position}</span>
                </label>
              ))}
            </div>
          </div>


          <div className="text-primary mb-6">
            <p className="text-primary text-black text-lg md:text-xl font-bold mb-2">Informe o valor:</p>
            <p className="text-primary text-black text-sm mb-4">
              O valor mínimo para apostar é de R$0,10 e o valor máximo é de R$5.000,00.
            </p>


            <div className="text-primary relative flex items-center mb-4">
              <span className="text-primary absolute left-3 text-black text-xl font-bold">R$</span>
              <input
                type="text"
                value={betAmount}
                onChange={handleBetAmountChange}
                inputMode="numeric"
                className="text-primary w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg text-black text-2xl md:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>


            <div className="text-primary flex gap-2 mb-6">
              <button
                onClick={() => handleIncrementAmount(5)}
                className="text-primary flex-1 bg-primary text-background font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                +5
              </button>
              <button
                onClick={() => handleIncrementAmount(10)}
                className="text-primary flex-1 bg-primary text-background font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                +10
              </button>
              <button
                onClick={() => handleIncrementAmount(25)}
                className="text-primary flex-1 bg-primary text-background font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                +25
              </button>
              <button
                onClick={() => handleIncrementAmount(50)}
                className="text-primary flex-1 bg-primary text-background font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                +50
              </button>
            </div>
          </div>


          <div className="text-primary mb-6">
            <p className="text-primary text-black text-sm mb-4">
              <span className="text-primary font-bold">"Todo"</span> significa que o valor será dividido entre todos os palpites, enquanto <span className="text-primary font-bold">"Cada"</span> significa que o valor será apostado para cada palpite.
            </p>
            <div className="text-primary flex gap-4">
              <button
                onClick={() => setSelectedType('Todos')}
                className={`
                  flex-1 font-bold py-3 rounded-lg transition-colors duration-200
                  ${selectedType === 'Todos' ? 'button-bg-withe text-background' : 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-background'}
                `}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedType('Cada')}
                className={`
                  flex-1 font-bold py-3 rounded-lg transition-colors duration-200
                  ${selectedType === 'Cada' ? 'button-bg-withe text-background' : 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-background'}
                `}
              >
                Cada
              </button>
            </div>
          </div>

    
          <button
            onClick={handleFinalContinue}
            className="w-full button-bg-withe text-background font-bold py-4 rounded-lg text-xl hover:opacity-90 transition-opacity duration-200 shadow-lg mt-6"
          >
            Continuar
          </button>

        </div>
      </main>


      <BottomNavBar />
    </div>
  );
}
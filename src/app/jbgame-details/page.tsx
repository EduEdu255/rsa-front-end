
"use client";

import React, { Suspense, useState, useEffect } from 'react'; 
import { useRouter, useSearchParams } from 'next/navigation';


function ConfirmacaoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const modalidade = searchParams.get('modalidade') || 'N/A';
  const animalIds = searchParams.get('animalIds') || '';
  const animalNames = searchParams.get('animalNames') || '';
  const position = searchParams.get('position') || 'N/A';
  const betAmount = searchParams.get('betAmount') || '0,00';
  const betType = searchParams.get('betType') || 'Todos';

  const decodedModalidade = decodeURIComponent(modalidade);
  const decodedAnimalNames = decodeURIComponent(animalNames).split(',').filter(name => name.trim() !== '');
  const decodedAnimalIds = animalIds.split(',').map(Number).filter(id => !isNaN(id));
  const decodedPosition = decodeURIComponent(position);
  const decodedBetAmount = decodeURIComponent(betAmount);
  const puleNumber = "H2bicho";
  const validityDate = "25/06/2025";
  const vendorId = "606610";
  const status = "PENDENTE";

  const loteriaSelecionada = "LT NACIONAL 23HS";

  const totalBetValue = parseFloat(decodedBetAmount.replace(',', '.')); 

  
  const handleFinalizarAposta = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (typeof window === 'undefined') {
      setError('Ambiente não suportado para esta operação.');
      setLoading(false);
      return;
    }

    const currentBalanceString = localStorage.getItem('userBalance') || '0,00';
    const currentBalance = parseFloat(currentBalanceString.replace(',', '.'));

    if (totalBetValue > currentBalance) {
      setError(`Saldo insuficiente para esta aposta. Seu saldo atual é R$ ${currentBalanceString}.`);
      setLoading(false);
      return;
    }

    console.log("Aposta a ser finalizada:", {
      puleNumber,
      validityDate,
      vendorId,
      status,
      modalidade: decodedModalidade,
      animais: decodedAnimalNames,
      idsAnimais: decodedAnimalIds,
      posicao: decodedPosition,
      valorAposta: decodedBetAmount,
      tipoAposta: betType,
      loteria: loteriaSelecionada,
      totalCalculado: totalBetValue
    });

    await new Promise(resolve => setTimeout(resolve, 1500)); 

    try {
     
      const newBalance = currentBalance - totalBetValue;
      localStorage.setItem('userBalance', newBalance.toFixed(2).replace('.', ',')); 


      const event = new CustomEvent('balanceUpdate', { detail: { newBalance: newBalance.toFixed(2).replace('.', ',') } });
      window.dispatchEvent(event);

      setSuccess(`Aposta finalizada com sucesso! Valor de R$ ${decodedBetAmount} debitado. Novo saldo: R$ ${newBalance.toFixed(2).replace('.', ',')}.`);

      setTimeout(() => {
        router.push('/home'); 
      }, 3000);

    } catch (err) {
      setError('Ocorreu um erro ao finalizar a aposta e deduzir o saldo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

          <h2 className="text-primary text-2xl md:text-3xl font-bold mb-6">Confirme seus jogos:</h2>

          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-200">
              <p className="text-sm text-gray-600 font-semibold">PULE # <span className="text-primary font-bold">{puleNumber}</span></p>
              <h3 className="text-xl text-primary font-bold">H2bicho</h3>
            </div>

            <div className="mb-4 text-sm text-gray-700 flex justify-between items-center">
              <p>VALE: {validityDate}</p>
              <p><span className="font-bold text-orange-500">{status}</span></p>
            </div>

            <div className="mb-6 text-sm">
              <p className="text-gray-700">VENDEDOR <span className="font-bold">{vendorId}</span></p>
            </div>

            <div className="border-t pt-4 border-gray-200">
              <p className="text-gray-800 font-bold mb-2">• {loteriaSelecionada}</p>
              <p className="text-gray-600 font-semibold mb-2 ml-4">MODALIDADES</p>

              <div className="mb-3 ml-4">
                <p className="text-gray-700 font-bold">
                  {decodedModalidade} - {decodedPosition}
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {decodedAnimalNames.map((name, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {name}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mt-2">{decodedBetAmount} / {betType.toUpperCase()}</p>
                <p className="text-green-600 text-sm font-semibold">Possível Prêmio: R$ {(totalBetValue * 800).toFixed(2).replace('.', ',')}</p>
              </div>
            </div>

            <div className="border-t pt-4 border-gray-200 mt-6 flex justify-between items-center">
              <p className="text-primary text-xl font-bold">TOTAL:</p>
              <p className="text-primary text-2xl font-bold">R$ {decodedBetAmount}</p>
            </div>
          </div>

          
          {loading && <p className="text-primary text-lg mt-4 text-center">Finalizando aposta...</p>}
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}

          
          {!success && (
            <button
              onClick={handleFinalizarAposta}
              disabled={loading} 
              className="w-full button-bg-withe text-background font-bold py-4 rounded-lg text-xl hover:opacity-90 transition-opacity duration-200 shadow-lg mt-6"
            >
              {loading ? 'Processando...' : 'Finalizar'}
            </button>
          )}

         
          {success && (
            <button
              onClick={() => router.push('/home')}
              className="w-full button-bg-withe text-background font-bold py-4 rounded-lg text-xl hover:opacity-90 transition-opacity duration-200 shadow-lg mt-6"
            >
              Voltar ao Início
            </button>
          )}

        </div>
      </main>
    </>
  );
}

export default function ConfirmacaoPage() {
  return (
    <Suspense fallback={<div>Carregando confirmação...</div>}>
      <ConfirmacaoContent />
    </Suspense>
  );
}
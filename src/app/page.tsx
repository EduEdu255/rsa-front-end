
"use client"; 

import React, { useState, useEffect } from 'react';
 

import { HeroSlider } from '../components/home/HeroSlider';
import { GameCard } from '../components/home/GameCard';
import { ResultCard } from '../components/home/ResultCard'; 
import { WinnerCard } from '../components/home/WinnerCard';
import Link from 'next/link';


const getRandomName = () => {
    const names = ['Ana C.', 'Pedro H.', 'Maria L.', 'Carlos M.', 'Sofia G.', 'Bruno F.'];
    return names[Math.floor(Math.random() * names.length)];
};


const lotteryTimes = [
  { label: 'Look 10h20', hour: 10, minute: 20 },
  { label: 'Rio 11h00', hour: 11, minute: 0 },
  { label: 'Nacional 12h00', hour: 12, minute: 0 },
  { label: 'Look 12h20', hour: 12, minute: 20 },
  { label: 'Rio 14h00', hour: 14, minute: 0 },
  { label: 'Nacional 15h00', hour: 15, minute: 0 },
  { label: 'Look 16h20', hour: 16, minute: 20 },
  { label: 'Rio 18h00', hour: 18, minute: 0 },
  { label: 'Federal 19h00', hour: 19, minute: 0 },
  { label: 'Nacional 19h00', hour: 19, minute: 0 },
  { label: 'Look 21h20', hour: 21, minute: 20 },
];

interface WinnerDataType { 
  id: number;
  type: string;
  time: string;
  name: string; 
  bet: string;
  won: string;
}

export default function HomePage() {

  const results = [
    { id: 1, type: 'Federal 19H', date: 'Sábado, 21 de Junho de 2025', lotteryId: 'federal-19h', fullDate: '2025-06-21' },
    { id: 2, type: 'Loteria Nacional 23HS', date: 'Sexta, 20 de Junho de 2025', lotteryId: 'loteria-nacional-23hs', fullDate: '2025-06-20' },
    { id: 3, type: 'Look Goias 14H', date: 'Sexta, 20 de Junho de 2025', lotteryId: 'look-goias-14h', fullDate: '2025-06-20' }, 
    { id: 4, type: 'Rio 14H', date: 'Sexta, 20 de Junho de 2025', lotteryId: 'rio-14h', fullDate: '2025-06-20' },
  ];

  const [currentWinners, setCurrentWinners] = useState<WinnerDataType[]>([]); 

  

  const fetchWinners = () => { 
    console.log('Buscando novos ganhadores...');
    
    const now = new Date(); 
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const availableLotteries = lotteryTimes.filter(lottery => {
      if (lottery.hour < currentHour) {
        return true; 
      }
      if (lottery.hour === currentHour && lottery.minute <= currentMinute) {
        return true; 
      }
      return false; 
    });

    if (availableLotteries.length === 0) {
      setCurrentWinners([
        { 
          id: Date.now(), 
          type: 'Aguardando', 
          time: 'Próximos sorteios', 
          name: 'Nenhum', 
          bet: 'R$ 0,00', 
          won: 'R$ 0,00' 
        }
      ]);
      return; 
    }

    const randomLottery = availableLotteries[Math.floor(Math.random() * availableLotteries.length)];

    const newWinner: WinnerDataType = { 
      id: Date.now(), 
      type: ['Centena', 'Milhar', 'Grupo', 'Dezena'][Math.floor(Math.random() * 4)], 
      time: randomLottery.label, 
      name: getRandomName(),
      bet: `R$ ${Math.floor(Math.random() * 50) + 5},00`,
      won: `R$ ${Math.floor(Math.random() * 5000) + 500},00`,
    };

    setCurrentWinners([newWinner]); 
  };

  useEffect(() => {
    fetchWinners(); 

    const intervalId = setInterval(fetchWinners, 1800000); 

    return () => clearInterval(intervalId);
  }, []); 

  return (
   

      <div className="p-9 space-y-6"> 
        <HeroSlider />

        <section className="text-center mt-6">
          <h2 className="text-[35px] font-bold text-purple-900 mb-4">Jogar</h2>
          <Link href="/login" passHref className="w-full">
            <div className="flex justify-center">
              <GameCard imageUrl="/images/JogoDoBichoIMG.webp" /> 
            </div>
          </Link>
        </section>

        <section className="text-center mt-6">
          <h2 className="text-[35px] font-bold text-purple-900 mb-4">Resultados</h2>
          <div className="space-y-3">
            {results.map((result) => (
              <ResultCard 
                key={result.id} 
                type={result.type} 
                date={result.date}
                lotteryId={result.lotteryId}
                fullDate={result.fullDate}
              />
            ))}
          </div>
        </section>

        <section className="text-center mt-6 pb-20"> 
          <h2 className="text-[35px] font-bold text-purple-900 mb-4">Ganhadores do Dia</h2>
          <div className="space-y-3">
            {currentWinners.length > 0 ? (
                currentWinners.map((winner) => (
                  <WinnerCard key={winner.id} {...winner} />
                ))
            ) : (
                <p className="text-black">Carregando ganhadores...</p> 
            )}
          </div>
        </section>
      </div>
   
     
    
  );
}
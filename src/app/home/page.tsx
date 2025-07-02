import { Header } from '../../components/common/Header'; 
import { HeroSlider } from '../../components/home/HeroSlider';
import { GameCard } from '../../components/home/GameCard';
import { ResultCard } from '../../components/home/ResultCard';
import { WinnerCard } from '../../components/home/WinnerCard';
import { BottomNavBar } from '../../components/common/BottomNavBar';

export default function HomePage() {
  
  const results = [
    { id: 1, type: 'Federal 19H', date: 'Sábado, 21 de Junho de 2025' },
    { id: 2, type: 'Federal 19H', date: 'Sábado, 21 de Junho de 2025' },
    { id: 3, type: 'Federal 19H', date: 'Sábado, 21 de Junho de 2025' },
    { id: 4, type: 'Federal 19H', date: 'Sábado, 21 de Junho de 2025' },
    
  ];

  const winners = [
    { id: 1, type: 'Centena', time: 'Look 12h20', name: 'João S.', bet: 'R$ 15,00', won: 'R$ 900,00' },
    
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <Header isLoggedIn={true} /> 

      <div className="p-9 space-y-6">
 
        <HeroSlider />

      
        <section className="text-center mt-6">
          <h2 className="text-[35px] font-bold text-purple-900 mb-4">Jogar</h2>
          <div className="flex justify-center">
            <GameCard imageUrl="/images/JogoDoBichoimg.webp" /> 
          </div>
        </section>

   
        <section className="text-center mt-6">
          <h2 className="text-[35px] font-bold text-purple-900 mb-4">Resultados</h2>
          <div className="space-y-3">
            {results.map((result) => (
              <ResultCard key={result.id} type={result.type} date={result.date} />
            ))}
          </div>
        </section>

  
        <section className="text-center mt-6 pb-20"> 
          <h2 className="text-[35px] font-bold text-purple-900 mb-4">Ganhadores do Dia</h2>
          <div className="space-y-3">
            {winners.map((winner) => (
              <WinnerCard key={winner.id} {...winner} />
            ))}
          </div>
        </section>
      </div>
      <BottomNavBar/>
    </div>
  );
}
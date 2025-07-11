

import Link from 'next/link'; 

interface ResultCardProps {
  type: string;
  date: string;
  lotteryId: string; 
  fullDate: string;  
}

export function ResultCard({ type, date, lotteryId, fullDate }: ResultCardProps) {

  const resultUrl = `/jbresultados?loteria=${lotteryId}&data=${fullDate}`;

  return (
    <div className="secondary-bg-container p-4 rounded-lg flex justify-between items-center border-botton-1 border-black">
      <div>
        <p className="font-bold text-[30px] text-start text-primary">{type}</p>
        <p className="text-sm text-black">{date}</p>
      </div>
      
     
      <Link href={resultUrl} passHref>
        <button className="button-bg-withe text-xs px-3 py-1 rounded-[7px]">
          Ver Resultado
        </button>
      </Link>
    </div>
  );
}
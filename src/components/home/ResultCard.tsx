

export function ResultCard({ type, date }: { type: string, date: string }) {
  return (
    <div className="bg-purple-100 p-4 rounded-lg flex justify-between items-center border-botton-1 border-black">
      <div>
        <p className="font-bold text-[30px] text-primary">{type}</p>
        <p className="text-sm text-black">{date}</p>
      </div>
      
        <button className="button-bg-withe text-xs px-3 py-1 rounded-[7px]">Ver Resultado</button>
      
      
    </div>
  );
}
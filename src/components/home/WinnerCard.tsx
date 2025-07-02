export function WinnerCard({ type, time, name, bet, won }: { type: string, time: string, name: string, bet: string, won: string }) {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-4 rounded-lg shadow-md">
      <p className="font-bold text-lg">{type}</p>
      <p className="text-sm mb-2">{time}</p>
      <p className="text-sm">João S.</p>
      <p className="text-sm">Apostou: <span className="font-bold">{bet}</span></p>
      <p className="text-sm">Ganhou: <span className="font-bold text-yellow-300">{won}</span></p>
    </div>
  );
}
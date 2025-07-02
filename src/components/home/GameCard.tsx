export function GameCard({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt="Jogo do Bicho" className="w-full h-auto" />
    </div>
  );
}
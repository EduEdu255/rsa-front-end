// src/app/components/AnimalCard.tsx
import React from 'react';
import Image from 'next/image';

interface AnimalCardProps {
  id: number;
  imageSrc: string;
  numbers: string; // Ex: "1 2 3 4"
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ id, imageSrc, numbers }) => {
  return (
    <div className="relative bg-background rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-[1.03] cursor-pointer">
      {/* Imagem do Animal */}
      <div className="w-full h-32 md:h-40 relative"> {/* Altura responsiva para a imagem */}
        <Image
          src={imageSrc}
          alt={`Animal ${id}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Otimização de imagem
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg" // Arredonda apenas os cantos superiores da imagem
          priority={id <= 4} // Carrega as primeiras imagens com prioridade
        />
      </div>

      {/* Círculo do ID no canto superior esquerdo */}
      <div className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-background font-bold text-lg md:text-xl shadow">
        {id}
      </div>

   
      <div className="p-2 md:p-3 text-center">
        <p className="text-foreground text-sm md:text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{numbers}</p>
      </div>
    </div>
  );
};
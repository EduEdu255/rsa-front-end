import React from 'react';
import Image from 'next/image';

interface AnimalCardProps {
  id: number;
  imageSrc: string;
  numbers: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ id, imageSrc, numbers, onClick, isSelected = false }) => {
  return (
    <div
      className={`
        relative bg-background rounded-lg shadow-md overflow-hidden transform transition-all duration-200
        cursor-pointer
        ${isSelected ? 'scale-[1.03] ring-4 ring-primary ring-offset-2 ring-offset-background' : 'hover:scale-[1.03]'}
      `}
      onClick={onClick}
    >

      {isSelected && (
        <div className="absolute -top-1 -left-2 z-20 w-8 h-8 md:w-10 md:h-10 button-bg-dark rounded-4xl flex items-center justify-center text-primary font-bold text-lg md:text-xl shadow-lg border-2 border-white">
          {id}
        </div>
      )}


      <div className="w-full h-32 md:h-40 relative">
        <Image
          src={imageSrc}
          alt={`Animal ${id}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg"
          priority={id <= 4}
        />
      </div>


      {!isSelected && (
        <div className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 button-bg-withe rounded-full flex items-center justify-center text-background font-bold text-lg md:text-xl shadow">
          {id}
        </div>
      )}



      <div className="p-2 md:p-3 button-bg-withe text-center">
        <p className="text-white text-sm md:text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{numbers}</p>
      </div>
    </div>
  );
};
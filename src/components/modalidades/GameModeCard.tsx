// src/app/components/GameModeCard.tsx
import React from 'react';

interface GameModeCardProps {
  mode: string;
  payout: string;
  onClick?: () => void;
}

export const GameModeCard: React.FC<GameModeCardProps> = ({ mode, payout, onClick }) => {
  return (
    <button
      className="
        flex justify-between items-center w-full
        primary-bg-container text-background 
        p-2 rounded-lg shadow-md
        cursor-pointer hover:opacity-90 transition-opacity duration-200
      "
      onClick={onClick}
    >
      <span className="font-semibold text-lg text-secondary">{mode}</span>
      <span className="font-bold text-lg  px-1 rounded-[7px] button-bg-dark">{payout}</span>
    </button>
  );
};
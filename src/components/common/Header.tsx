
import React from 'react';
import Link from 'next/link';


export function Header({ isLoggedIn = false }) {
    return (
        <header className="primary-bg-container text-secondary p-9 px-5 flex justify-between items-center h-16">
            {isLoggedIn ? (
                <>
                    
                    <img src="/images/logo.webp" alt="Logo" /> 

                    <div className='flex '>
                        <Link href="/depositar" className="bg-white font-bold m-3 p-1 rounded-full text-sm text-primary flex items-center gap-1">
                            Depositar {'➔'}
                        </Link>

                        <div className="flex items-center gap-2 bg-white p-2 rounded-[15px]">
                            <span className="font-bold text-primary text-lg">R$ 0,00</span>
                            <Link href="/perfil" className="text-2xl">
                                
                                <img src="/PerfilIcon.svg" alt="Ícone de Perfil" /> 
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <>
                  
                    <img src="/images/logo.webp" alt="Logo" /> 
                    <div className="flex gap-2">
                        <Link href="/login" className="button-bg-dark-secondary px-4 py-2 border-2 rounded-lg text-sm">Entrar</Link>
                        <Link href="/register" className="button-bg-dark px-4 py-2 rounded-lg text-sm">Registrar</Link>
                    </div>
                </>
            )}
        </header>
    );
}
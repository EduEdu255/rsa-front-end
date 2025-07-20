
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Header() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [balance, setBalance] = useState<string>('0,00');


    const loadHeaderData = () => {
        if (typeof window !== 'undefined') {
            const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
            const storedUserName = localStorage.getItem('userName') || '';
            const storedBalance = localStorage.getItem('userBalance') || '0,00';

            setIsLoggedIn(loggedInStatus);
            setUserName(storedUserName);
            setBalance(storedBalance);
        }
    };

    useEffect(() => {
        loadHeaderData();

        const handleStorageChange = (event: Event) => {

            if (event instanceof StorageEvent && (event.key === 'isLoggedIn' || event.key === 'userName' || event.key === 'userBalance')) {
                loadHeaderData();
            } else if (event.type === 'balanceUpdate' && 'detail' in event && event.detail && typeof event.detail === 'object' && 'newBalance' in event.detail) {

                setBalance((event.detail as { newBalance: string }).newBalance);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        window.addEventListener('balanceUpdate', handleStorageChange as EventListener);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('balanceUpdate', handleStorageChange as EventListener);
        };

    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('authToken');
            localStorage.removeItem('userBalance');
            localStorage.removeItem('userCpf');
            localStorage.removeItem('userPhone');


            setIsLoggedIn(false);
            setUserName('');
            setBalance('0,00');
            router.push('/login');
        }
    };

    return (
        <header className=" primary-bg-container text-secondary p-9 px-5 flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
                <Link href="/">
                    <Image src="/images/Logo.png" alt="H2bicho Logo" width={40} height={40} className="rounded-full" />
                </Link>
            </div>

            <nav>
                {isLoggedIn ? (
                    <div className='flex '>
                        <Link href="/depositar" className="bg-white font-bold m-3 p-1 rounded-full text-sm text-primary flex items-center gap-1">
                            Depositar {'➔'}
                        </Link>

                        <div className="flex items-center gap-2 bg-white p-2 rounded-[15px]">
                            <span className="font-bold text-primary text-lg">R$ {balance}</span>
                            <Link href="/perfil" className="text-2xl">
                                <Image src="/PerfilIcon.svg" alt="Ícone de Perfil" width={24} height={24} />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login" className="button-bg-dark-secondary px-4 py-2 border-2 rounded-lg text-sm">Entrar</Link>
                        <Link href="/register" className="button-bg-dark px-4 py-2 rounded-lg text-sm">Registrar</Link>
                    </div>
                )}
            </nav>
        </header >
    );
}
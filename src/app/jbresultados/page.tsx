
"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '../../components/common/Header';
import { BottomNavBar } from '../../components/common/BottomNavBar';
import { useRouter } from 'next/navigation';

interface ResultadoDetalhes {
    '1º Prêmio': string;
    '2º Prêmio'?: string;
    '3º Prêmio'?: string;
    [key: string]: string | undefined;
}

interface ResultadoData {
    type: string;
    date: string;
    resultado: ResultadoDetalhes;
}

interface DummyResultadosMap {
    [lotteryId: string]: {
        [date: string]: ResultadoData;
    };
}


function ResultadosContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const lotteryType = searchParams.get('loteria');
    const resultDate = searchParams.get('data');

    const dummyResultados: DummyResultadosMap = {
        'federal-19h': {
            '2025-06-21': {
                type: 'Federal 19H',
                date: 'Sábado, 21 de Junho de 2025',
                resultado: {
                    '1º Prêmio': '12345 (Águia)',
                    '2º Prêmio': '67890 (Galo)',
                    '3º Prêmio': '11223 (Elefante)',
                }
            }
        },
        'loteria-nacional-23hs': {
            '2025-06-20': {
                type: 'Loteria Nacional 23HS',
                date: 'Sexta, 20 de Junho de 2025',
                resultado: {
                    '1º Prêmio': '98765 (Tigre)',
                    '2º Prêmio': '43210 (Cachorro)',
                }
            }
        },
        // CORREÇÃO AQUI: 'look-goias-14h' com 'h' minúsculo para consistência
        'look-goias-14h': {
            '2025-06-20': {
                type: 'Look Goias 14H',
                date: 'Sexta, 20 de Junho de 2025',
                resultado: {
                    '1º Prêmio': '12345 (Águia)',
                    '2º Prêmio': '67890 (Galo)',
                    '3º Prêmio': '11223 (Elefante)',
                }
            }
        },
        'rio-14h': {
            '2025-06-20': {
                type: 'Rio 14H',
                date: 'Sexta, 20 de Junho de 2025',
                resultado: {
                    '1º Prêmio': '98765 (Tigre)',
                    '2º Prêmio': '43210 (Cachorro)',
                }
            }
        },
       
    };

    const currentResult = lotteryType && resultDate
        ? dummyResultados[lotteryType]?.[resultDate]
        : undefined;

    return (
        <div className="flex flex-col min-h-screen bg-background text-primary">
            <Header isLoggedIn={true} />

            <main className="flex-grow relative overflow-hidden">
                <div className="absolute inset-0 striped-background"></div>

                <div className="relative z-10 w-full max-w-lg mx-auto p-4 md:p-6 lg:p-8 content-area-bg rounded-lg shadow-lg my-4">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <button
                            onClick={() => router.back()}
                            className="text-primary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            aria-label="Voltar"
                        >
                            ←
                        </button>
                        <h1 className="text-primary text-4xl md:text-3xl font-bold">Detalhes do Resultado</h1>
                    </div>

                    <div className="mb-6">
                        {currentResult ? (
                            <>
                                <p className="text-primary text-lg md:text-xl font-bold mb-1">
                                    Loteria: <span className="text-black">{currentResult.type}</span>
                                </p>
                                <p className="text-primary text-md mt-1">
                                    Data: <span className="text-black">{currentResult.date}</span>
                                </p>
                                <h2 className="text-primary text-xl md:text-2xl font-bold mb-4 mt-4">Resultados Oficiais:</h2>
                                <div className="space-y-2">
                                    {Object.entries(currentResult.resultado).map(([premio, valor]) => (
                                        <p key={premio} className="text-black">
                                            <strong>{premio}:</strong> {valor as string}
                                        </p>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="text-black text-lg">
                                Resultado não encontrado para esta loteria e data.
                                {(!lotteryType || !resultDate) && " Verifique os parâmetros da URL."}
                            </p>
                        )}
                    </div>
                </div>
            </main>

            
        </div>
    );
}

// Componente da página que envolve o conteúdo com Suspense
export default function JbResultadosPage() {
    return (
        <Suspense fallback={<div>Carregando detalhes do resultado...</div>}>
            <ResultadosContent />
        </Suspense>
    );
}
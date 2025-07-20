
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DepositarPage() {
    const router = useRouter();
    const [amount, setAmount] = useState<string>('');
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [copyAndPasteCode, setCopyAndPasteCode] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeposit = async () => {
        setError(null);
        setLoading(true);
        setQrCodeData(null);
        setCopyAndPasteCode(null);

        const depositAmount = parseFloat(amount.replace(',', '.'));

        if (isNaN(depositAmount) || depositAmount <= 0) {
            setError('Por favor, insira um valor válido para o depósito.');
            setLoading(false);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            const mockData = {
                transactionId: 'mock_txn_1234567890',
                qrCode: '/mock-qrcode.png',
                copyAndPaste: '00020126580014BR.GOV.BCB.PIX0136709825484-a1f3-4d76-8b2b-8a5840d28d005204000053039865406100.005802BR5908SEUDONOME6007BRASIL62070503***6304FC71',
            };

            setQrCodeData(mockData.qrCode);
            setCopyAndPasteCode(mockData.copyAndPaste);

            if (typeof window !== 'undefined') {
                const currentBalanceString = localStorage.getItem('userBalance') || '0,00';
                const currentBalance = parseFloat(currentBalanceString.replace(',', '.'));
                const newBalance = currentBalance + depositAmount;
                localStorage.setItem('userBalance', newBalance.toFixed(2).replace('.', ','));

                const event = new CustomEvent('balanceUpdate', { detail: { newBalance: newBalance.toFixed(2).replace('.', ',') } });
                window.dispatchEvent(event);
            }

        } catch (_err) {
            setError('Falha ao gerar o PIX. Tente novamente. (Mock de erro)');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (copyAndPasteCode) {
            navigator.clipboard.writeText(copyAndPasteCode);
            alert('Código Copia e Cola copiado!');
        }
    };

    return (
        <div className="min-h-screen primary-bg-container text-black flex flex-col items-center p-4">
            <div className="text-primary flex items-center justify-center gap-4 mb-6">
                <button onClick={() => router.back()} className="text-secondary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                    ←
                </button>
                <h1 className="text-secondary text-4xl md:text-3xl font-bold">Depositar</h1>
            </div>

            <div className="w-full max-w-md div-bg rounded-[20px] shadow-lg p-6 space-y-6 flex flex-col items-center mt-8">
                {!qrCodeData && !loading && (
                    <>
                        <h2 className="text-text-dark text-xl font-semibold mb-4">Insira o valor para depósito PIX</h2>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Ex: 100.00"
                            className="w-full p-3 rounded-lg border-input focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button
                            onClick={handleDeposit}
                            disabled={loading}
                            className="button-bg-withe font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 w-full mt-4"
                        >
                            {loading ? 'Gerando PIX...' : 'Gerar PIX'}
                        </button>
                    </>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center h-40">
                        <p className="text-primary text-lg">Carregando...</p>
                    </div>
                )}

                {qrCodeData && copyAndPasteCode && (
                    <div className="flex flex-col items-center space-y-4">
                        <h2 className="text-text-dark text-xl font-semibold">PIX Gerado com Sucesso!</h2>
                        <Image
                            src={qrCodeData}
                            alt="QR Code PIX"
                            width={200}
                            height={200}
                            className="border-2 border-secondary p-2 rounded-lg"
                        />
                        <p className="text-text-dark text-center font-medium">Escaneie o QR Code ou use o código:</p>
                        <div className="button-bg-withe p-3 rounded-lg break-all text-sm text-center w-full">
                            {copyAndPasteCode}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="button-bg-withe font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 w-full"
                        >
                            Copiar Código
                        </button>
                        <button
                            onClick={() => { setQrCodeData(null); setCopyAndPasteCode(null); setAmount(''); }}
                            className="text-primary text-sm mt-4 hover:underline"
                        >
                            Fazer novo depósito
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
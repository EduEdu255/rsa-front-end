
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function SacarPage() {
    const router = useRouter();
    const [amount, setAmount] = useState<string>('');
    const [pixKeyType, setPixKeyType] = useState<string>('CPF');
    const [pixKey, setPixKey] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleWithdraw = async () => {
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        const withdrawAmount = parseFloat(amount.replace(',', '.'));

        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            setError('Por favor, insira um valor válido para o saque.');
            setLoading(false);
            return;
        }

        if (!pixKey.trim()) {
            setError('Por favor, insira a chave PIX.');
            setLoading(false);
            return;
        }

        if (typeof window === 'undefined') {
            setError('Ambiente não suportado para esta operação.');
            setLoading(false);
            return;
        }

        const currentBalanceString = localStorage.getItem('userBalance') || '0,00';
        const currentBalance = parseFloat(currentBalanceString.replace(',', '.'));

        if (withdrawAmount > currentBalance) {
            setError(`Saldo insuficiente. Seu saldo atual é R$ ${currentBalanceString}.`);
            setLoading(false);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            const mockData = {
                transactionId: 'mock_withdraw_txn_987654321',
                status: 'pending',
            };

            const newBalance = currentBalance - withdrawAmount;
            localStorage.setItem('userBalance', newBalance.toFixed(2).replace('.', ','));

            const event = new CustomEvent('balanceUpdate', { detail: { newBalance: newBalance.toFixed(2).replace('.', ',') } });
            window.dispatchEvent(event);

            setSuccessMessage(`Saque de R$ ${withdrawAmount.toFixed(2).replace('.', ',')} solicitado com sucesso! Novo saldo: R$ ${newBalance.toFixed(2).replace('.', ',')}. Transação ID: ${mockData.transactionId}. (Mock)`);

        } catch (_err) {
            setError('Falha ao solicitar o saque. Tente novamente. (Mock de erro)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen primary-bg-container text-black flex flex-col items-center p-4">

            <div className="text-primary flex items-center justify-center gap-4 mb-6">
                <button onClick={() => router.back()} className="text-secondary text-3xl font-bold p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                    ←
                </button>
                <h1 className="text-secondary text-4xl md:text-3xl font-bold">Sacar</h1>
            </div>

            <div className="w-full max-w-md div-bg rounded-[20px] shadow-lg p-6 space-y-6 flex flex-col items-center mt-8">
                {!successMessage && !loading && (
                    <>
                        <h2 className="text-text-dark text-xl font-semibold mb-4">Insira os dados para saque PIX</h2>


                        <div className='w-full'>
                            <label htmlFor="amount" className="block text-text-dark text-sm font-bold mb-2">
                                Valor do Saque:
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Ex: 50.00"
                                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
                            />
                        </div>


                        <div className='w-full'>
                            <label htmlFor="pixKeyType" className="block text-text-dark text-sm font-bold mb-2">
                                Tipo da Chave PIX:
                            </label>
                            <select
                                id="pixKeyType"
                                value={pixKeyType}
                                onChange={(e) => setPixKeyType(e.target.value)}
                                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark bg-white"
                            >
                                <option value="CPF">CPF</option>
                                <option value="CNPJ">CNPJ</option>
                                <option value="CELULAR">Celular</option>
                                <option value="EMAIL">E-mail</option>
                                <option value="ALEATORIA">Chave Aleatória</option>
                            </select>
                        </div>


                        <div className='w-full'>
                            <label htmlFor="pixKey" className="block text-text-dark text-sm font-bold mb-2">
                                Chave PIX:
                            </label>
                            <input
                                type="text"
                                id="pixKey"
                                value={pixKey}
                                onChange={(e) => setPixKey(e.target.value)}
                                placeholder="Insira a chave PIX"
                                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                        <button
                            onClick={handleWithdraw}
                            disabled={loading}
                            className="button-bg-withe font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 w-full mt-4"
                        >
                            {loading ? 'Solicitando Saque...' : 'Solicitar Saque'}
                        </button>
                    </>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center h-40">
                        <p className="text-primary text-lg">Carregando...</p>

                    </div>
                )}

                {successMessage && (
                    <div className="flex flex-col items-center space-y-4">
                        <h2 className="text-text-dark text-xl font-semibold text-center">Saque Solicitado!</h2>
                        <p className="text-text-dark text-center">{successMessage}</p>
                        <button
                            onClick={() => { setSuccessMessage(null); setAmount(''); setPixKey(''); setPixKeyType('CPF'); }}
                            className="text-primary text-sm mt-4 hover:underline"
                        >
                            Fazer novo saque
                        </button>
                        <button
                            onClick={() => router.push('/perfil')}
                            className="text-primary text-sm mt-2 hover:underline"
                        >
                            Voltar ao Perfil
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
// src/app/trocar-senha/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrocarSenhaPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChangePassword = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('A nova senha e a confirmação não coincidem.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');
      setLoading(false);
      return;
    }

    if (newPassword === currentPassword) {
      setError('A nova senha não pode ser igual à senha atual.');
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      setSuccess('Senha alterada com sucesso! Você será redirecionado.');
      
      setTimeout(() => {
        router.push('/perfil');
      }, 1500);

    } catch (_) { 
      setError('Falha ao trocar a senha. Tente novamente. (Mock de erro)');
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
        <h1 className="text-secondary text-4xl md:text-3xl font-bold">Trocar Senha</h1>
      </div>

      <div className="w-full max-w-md div-bg rounded-[20px] shadow-lg p-6 space-y-6 flex flex-col items-center mt-8">
        {!success && !loading && (
          <>
            <h2 className="text-text-dark text-xl font-semibold mb-4">Atualize sua senha</h2>

            <div className='w-full'>
              <label htmlFor="currentPassword" className="block text-text-dark text-sm font-bold mb-2">
                Senha Atual:
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Sua senha atual"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
              />
            </div>

            <div className='w-full'>
              <label htmlFor="newPassword" className="block text-text-dark text-sm font-bold mb-2">
                Nova Senha:
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
              />
            </div>

            <div className='w-full'>
              <label htmlFor="confirmNewPassword" className="block text-text-dark text-sm font-bold mb-2">
                Confirmar Nova Senha:
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirme sua nova senha"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="button-bg-withe font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 w-full mt-4"
            >
              {loading ? 'Trocando Senha...' : 'Trocar Senha'}
            </button>
          </>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-primary text-lg">Carregando...</p>
          </div>
        )}

        {success && (
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-text-dark text-xl font-semibold">{success}</h2>
            <button
              onClick={() => {
                setSuccess(null);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                router.push('/perfil');
              }}
              className="text-primary text-sm mt-4 hover:underline"
            >
              Voltar ao Perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
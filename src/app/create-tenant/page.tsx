
"use client";

import React, { useState } from 'react';

interface CreateTenantPayload {
  name: string;
  domain: string;
}

async function createNewTenant(tenantData: CreateTenantPayload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        id: 'mock-tenant-id-' + Math.random().toString(36).substr(2, 9),
        name: tenantData.name,
        domain: tenantData.domain,
        status: true,
        createdAt: new Date().toISOString(),
      };
      console.log('Mock: Tenant criado com sucesso!', mockResponse);
      resolve(mockResponse);
    }, 1000);
  });

  // --- CÓDIGO REAL DA API (COMENTADO) ---
  /*
  try {
    const response = await fetch(`${API_BASE_URL}/tenants/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tenantData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Erro na API: ${response.status} ${response.statusText}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Se não for JSON, o texto bruto já é a mensagem
      }
      throw new Error(errorMessage);
    }
    console.log('Tenant criado com sucesso (resposta 200 OK da API)!');
    return { message: 'Tenant criado com sucesso!' };

  } catch (error: any) { // Este 'any' seria corrigido se o código real estivesse ativo
    console.error('Falha ao criar tenant:', error.message);
    throw error;
  }
  */
}


export default function CreateTenantPage() {
  const [name, setName] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);

    try {
      await createNewTenant({ name, domain });
      setMessage('Tenant criado com sucesso (MOCK)!');
      setName('');
      setDomain('');
    } catch (error: unknown) { 
      let errorMessage = 'Verifique o console para mais detalhes.';
      if (error instanceof Error) { 
        errorMessage = error.message;
      }
      setMessage(`Erro ao criar tenant (MOCK): ${errorMessage}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-800">Criar Novo Tenant</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nome do Tenant:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="domain" className="block text-gray-700 text-sm font-bold mb-2">
              Domínio do Tenant:
            </label>
            <input
              type="text"
              id="domain"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="ex: meuapp.com.br"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Tenant (MOCK)'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
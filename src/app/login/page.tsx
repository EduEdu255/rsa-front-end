
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface SignInPayload {
  tenantId: string;
  login: string;
  password: string;
}


interface SignInResponse {
  token: string;
  userId: string;
  username: string;
  tenantId: string;
}

async function signInUserMock(credentials: SignInPayload): Promise<SignInResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    
      const validLoginCpf = '123.456.789-00';
      const validPassword = 'senha123';

      if (
        (credentials.login === validLoginCpf || credentials.login === 'teste@mock.com') &&
        credentials.password === validPassword
      ) {
        const mockResponse: SignInResponse = {
          token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9),
          userId: 'mock-user-id-' + Math.random().toString(36).substr(2, 9),
          username: 'Usuário Mock',
          tenantId: credentials.tenantId,
        };
        console.log('Mock: Login bem-sucedido!', mockResponse);
        resolve(mockResponse);
      } else if (credentials.login === '000.000.000-00' || credentials.login === 'erro@mock.com') {
        console.error('Mock: Usuário não encontrado.');
        reject(new Error('Usuário não encontrado.'));
      } else {
        console.error('Mock: Credenciais inválidas.');
        reject(new Error('Credenciais inválidas. Verifique seu login e senha.'));
      }
    }, 1500);
  });
}


export default function LoginPage() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const rawValue = value.replace(/\D/g, '');

    if (rawValue.length > 11) {
      value = rawValue.slice(0, 11);
    } else if (rawValue.length > 9) {
      value = rawValue.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    } else if (rawValue.length > 6) {
      value = rawValue.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (rawValue.length > 3) {
      value = rawValue.replace(/(\d{3})(\d+)/, '$1.$2');
    } else {
      value = rawValue;
    }

    setLogin(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);

    try {
      const tenantId = 'mock-tenant-id-fixed';
      const result = await signInUserMock({
        tenantId: tenantId,
        login: login,
        password: password,
      });

      setMessage('Login bem-sucedido! Redirecionando...');
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', result.username);
        localStorage.setItem('authToken', result.token);
      }

      router.push('/home');

    } catch (error: unknown) { 
      let errorMessage = 'Verifique o console para mais detalhes.';
      if (error instanceof Error) { 
        errorMessage = error.message;
      }
      setMessage(`Erro no login: ${errorMessage}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen primary-bg-container flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm div-bg rounded-[20px] shadow-lg p-6 space-y-6 flex flex-col items-center">
        <div className="relative w-28 h-28 mb-4">
          <Image
            src="/images/Logo.png"
            alt="H2bicho Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4 flex flex-col items-center">
          <input
            type="text"
            placeholder="CPF ou E-mail"
            value={login}
            onChange={handleLoginChange}
            className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
          />

          {message && (
            <p className={`w-full text-center ${isError ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className={`w-full button-bg-withe text-text-light font-bold py-3 rounded-lg hover:bg-secondary transition-colors duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <Link href="/register" passHref className="w-full">
          <button className="w-full border-input text-text-light font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300">
            Criar conta
          </button>
        </Link>
      </div>
    </div>
  );
}
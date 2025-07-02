import Image from 'next/image';
import Link from 'next/link';

export default function EntrarPage() {
  return (

    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
 
      <div className="w-full max-w-sm bg-card-bg rounded-lg shadow-lg p-6 space-y-6 flex flex-col items-center">

       
        <div className="relative w-28 h-28 mb-4"> 
          <Image
            src="/images/h2bicho-logo.png" 
            alt="H2bicho Logo"
            fill 
            style={{ objectFit: 'contain' }} 
            priority 
          />
        </div>

 
        <input
          type="text"
          placeholder="CPF"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark" // text-text-dark para o texto escuro
        />
        <input
          type="text"
          placeholder="Número"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark"
        />

     
        <button className="w-full bg-primary text-text-light font-bold py-3 rounded-lg hover:bg-secondary transition-colors duration-300">
          Cadastrar
        </button>

        
        <Link href="/login" passHref className="w-full">
          <button className="w-full bg-secondary text-text-light font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300">
            Já tenho uma conta
          </button>
        </Link>
      </div>

      
    </div>
  );
}
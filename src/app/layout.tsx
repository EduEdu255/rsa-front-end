
import './globals.css';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { Header } from '../components/common/Header'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
      
        <main className="pb-20"> 
          {children}
        </main>
        <BottomNavBar /> 
      </body>
    </html>
  );
}
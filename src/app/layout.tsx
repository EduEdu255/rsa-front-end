
import './globals.css';


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
      </body>
    </html>
  );
}
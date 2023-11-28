import type { Metadata } from 'next';
import { Libre_Baskerville, PT_Sans } from 'next/font/google';

import './globals.css';

const ptSans = PT_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fazendas e Engenhos - Cátedra Jaime Cortesão FFLCH-USP',
  description:
    'Plataforma digital interativa de propriedades, proprietários, localização georreferenciada e indicações de documentos das fazendas e engenhos da Baixada Santista no Período Colonial'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ptSans.className}>{children}</body>
    </html>
  );
}

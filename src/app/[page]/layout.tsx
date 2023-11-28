'use client';

import { Libre_Baskerville } from 'next/font/google';
import Link from 'next/link';
const libre = Libre_Baskerville({ weight: ['400', '700'], subsets: ['latin'] });
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Início', url: '/' },
  { label: 'Sobre', url: '/sobre' },
  { label: 'Catálogo', url: '/catalogo' },
  { label: 'Cartografia', url: '/cartografia' },
  { label: 'Equipe', url: '/equipe' }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <header className="bg-[url('/bg.jpg')] bg-cover bg-center min-h-20">
        <div className="flex max-w-screen mx-auto justify-between px-5 py-5">
          <img
            className="h-8 flex-none"
            src="/fflch-catedra.png"
            alt="Cátedra Jaime Cortesão - Faculdade de filosofia, Letras e Ciências Humanas da Universidade de São Paulo"
          />
          <img
            className="h-7 flex-none"
            src="/usp.png"
            alt="Universidade de São Paulo"
          />
        </div>
        <div className="container mx-auto pb-6 text-center text-[#fff]">
          <h1
            className={`text-[4vw]/[5.2vw] md:text-4xl uppercase  ${libre.className}  drop-shadow-md mb-8`}
          >
            Fazendas e engenhos
            <br />
            <span className="text-[3vw] md:text-3xl/7">
              da Baixada Santista
              <br />
              nos séculos XVI ao XVIII
            </span>
          </h1>
          <div
            className="flex gap-3 align-center md:gap-4 flex-row  auto-columns-max justify-center border-y-[1px] pt-0.5 pb-1 border-teal-500 w-max
       mx-auto"
          >
            {navItems.map(item => {
              return (
                <Link key={item.label} href={item.url}>
                  <button
                    className={`hover:text-teal-100 duration-150 ease-in uppercase tracking-wide md:tracking-widest text-xs md:text-sm ${
                      item.url === pathname ? 'text-teal-50 font-bold' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </header>
      <div className="text-slate-800">{children}</div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="flex flex-col md:flex-row">
            <div className="flex-none basis-full md:basis-1/2 mb-8">
              <h2
                className={`text-md md:text-lg uppercase  ${libre.className}  drop-shadow-md mb-4`}
              >
                Fazendas e engenhos
                <br />
                da Baixada Santista
                <br />
                nos séculos XVI ao XVIII
              </h2>
              <div className="text-sm text-teal-400">
                cjc.fflch.usp.br
                <br />
                cjc@usp.br
                <br />
                +55 11 3091 2101 | + 55 11 3091 1511
              </div>
            </div>
            <div className="flex-none basis-full md:basis-1/4 mb-8">
              <p
                className={`text-teal-400 text-xs tracking-widest uppercase mb-4 ${libre.className}`}
              >
                Menus
              </p>

              {navItems.map(item => {
                return (
                  <Link key={item.label} href={item.url}>
                    <p
                      className={`text-sm mb-1 hover:text-teal-300 duration-150 ease-in ${
                        item.url === pathname ? 'text-teal-300 font-bold' : ''
                      }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="flex-none basis-full md:basis-1/4 mb-8">
              <p
                className={`text-teal-400 text-xs tracking-widest uppercase mb-4 ${libre.className}`}
              >
                Realização
              </p>
              <Link
                href="https://usp.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-6 mb-5"
                  src="/usp.png"
                  alt="Universidade de São Paulo"
                />
              </Link>
              <Link
                href="https://cjc.fflch.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-8 "
                  src="/fflch-catedra.png"
                  alt="Cátedra Jaime Cortesão - Faculdade de filosofia, Letras e Ciências Humanas da Universidade de São Paulo"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

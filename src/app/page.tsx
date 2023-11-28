import Image from 'next/image';
import { Libre_Baskerville } from 'next/font/google';
import Link from 'next/link';
const libre = Libre_Baskerville({ weight: ['700'], subsets: ['latin'] });

export default function Home() {
  return (
    <main className="bg-[url('/bg.jpg')] bg-cover bg-center min-h-screen flex items-center">
      <div className="container mx-auto py-8 md:py-12 text-center text-[#fff]">
        <div className="flex max-w-4xl mx-auto justify-between mb-8  md:mb-20 px-12">
          <img className="h-8 flex-none" src="/fflch-catedra.png" alt="" />
          <img className="h-8 flex-none" src="/usp.png" alt="" />
        </div>
        <h1
          className={`text-[5.2vw]/[5.2vw] lg:text-6xl uppercase  ${libre.className}  drop-shadow-md mb-6 md:mb-12`}
        >
          Fazendas e engenhos
          <br />
          <span className="text-[4vw] lg:text-5xl/7 relative top-1">
            da Baixada Santista
            <br />
            nos séculos XVI ao XVIII
          </span>
        </h1>
        <div
          className="flex gap-2 md:gap-8 flex-col md:flex-row grid-flow-col auto-columns-max justify-center border-y-[1px] py-1 border-teal-400 w-max
         mx-auto mb-10 md:mb-16"
        >
          <Link href="/sobre">
            <button className="hover:text-teal-100 duration-150 ease-in uppercase font-bold tracking-widest">
              Sobre
            </button>
          </Link>
          <Link href="/catalogo">
            <button className="hover:text-teal-100 duration-150 ease-in uppercase font-bold tracking-widest">
              Catálogo
            </button>
          </Link>
          <Link href="/sobre">
            <button className="hover:text-teal-100 duration-150 ease-in uppercase font-bold tracking-widest">
              Cartografia
            </button>
          </Link>
          <Link href="/equipe">
            <button className="hover:text-teal-100 duration-150 ease-in uppercase font-bold tracking-widest">
              Equipe
            </button>
          </Link>
        </div>
        <div className="md:mx-auto max-w-3xl px-7">
          <p className="text-1xl md:text-2xl drop-shadow-md">
            Plataforma interativa que relaciona, organiza e divulga documentos e
            dados georreferenciados de propriedades e proprietários, como
            ferramentas de pesquisa sobre a estrutura socioeconômica da região.
          </p>
        </div>
      </div>
    </main>
  );
}

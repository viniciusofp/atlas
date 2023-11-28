'use client';

import { Libre_Baskerville } from 'next/font/google';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import useSWR from 'swr';
const libre = Libre_Baskerville({ weight: ['700'], subsets: ['latin'] });

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Page({ params }: { params: { page: string } }) {
  const { data, error } = useSWR(
    `https://script.google.com/macros/s/AKfycbx4K9IRhLfwN5zs5W-lxpJe-jzKJqyg3m5YIXGs8cq6BDezdk6hFD8muu6BNwyQNWhO-Q/exec?pageName=${params.page}`,
    fetcher
  );

  return (
    <>
      <div className="bg-teal-400 py-12">
        <div className="container max-w-5xl mx-auto border-l-2 border-white">
          <div className=" text-white container mx-auto max-w-3xl px-6">
            <p className="uppercase tracking-widest drop-shadow-sm">
              {!data ? 'Carregando...' : data.chapeu}
            </p>
            <h1
              className={`text-2xl md:text-4xl/tight tracking-relaxed drop-shadow-md ${libre.className}`}
            >
              {!data ? 'Carregando...' : data.titulo}
            </h1>
          </div>
        </div>
      </div>
      <div className="container max-w-5xl mx-auto border-l-2 border-teal-400 mt-8 mb-12">
        <main className="container mx-auto max-w-3xl px-6 text-md leading-relaxed page-content">
          <Markdown>{!data ? 'Carregando...' : data.conteudo}</Markdown>
        </main>
      </div>
    </>
  );
}

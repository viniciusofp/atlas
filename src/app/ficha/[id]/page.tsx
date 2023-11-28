'use client';

import { Libre_Baskerville } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import useSWR from 'swr';
const libre = Libre_Baskerville({ weight: ['700'], subsets: ['latin'] });
import Map, { Marker } from 'react-map-gl';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const Article = ({ data }: { data: any }) => {
  const defaultProps = {
    center: {
      lat: parseFloat(data.latitude.replace(',', '.')),
      lng: parseFloat(data.longitude.replace(',', '.'))
    },
    zoom: 11
  };
  return (
    <>
      <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
        Proprietário
      </p>
      <h3 className={`text-3xl mb-0 ${libre.className}`}>
        {data.proprietario}
      </h3>
      {!!data.ocupacao && (
        <p className="text-gray-700 mb-7 mt-3">{data.ocupacao}</p>
      )}
      <div className="flex flex-row gap-9 flex-wrap mt-7 mb-2">
        {!!data.ano && (
          <div>
            <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
              Ano *
            </p>
            <p className={`text-xl mb-0 ${libre.className}`}>{data.ano}</p>
          </div>
        )}

        {!!data.aquisicao && (
          <div>
            <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
              Aquisição
            </p>
            <p className={`text-xl mb-0 ${libre.className}`}>
              {data.aquisicao}
            </p>
          </div>
        )}

        {!!data.local && (
          <div>
            <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
              Local
            </p>
            <p className={`text-xl mb-0 ${libre.className}`}>{data.local}</p>
          </div>
        )}
      </div>

      <p className="text-[10px] text-gray-500 mb-7">
        *Cálculo aproximado da aquisição de terras, de acordo com o cruzamento
        de dados prosopográficos do proprietário como morte, casamento, viagens,
        etc.
      </p>

      {!!data.atividade_economica && (
        <>
          <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
            Atividade Econômica
          </p>
          <p className={`text-gray-700 mb-7`}>{data.atividade_economica}</p>
        </>
      )}

      {!!data.descricao && (
        <>
          <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
            Descrição
          </p>
          <p className={`text-gray-700 mb-7`}>{data.descricao}</p>
        </>
      )}

      {!!data.cartografia && (
        <>
          <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
            Cartografia
          </p>
          {data.cartografia_url ? (
            <Link
              href={data.cartografia_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className={`text-gray-700 mb-7 underline`}>
                {data.cartografia}
              </p>
            </Link>
          ) : (
            <p className={`text-gray-700 mb-7`}>{data.cartografia}</p>
          )}
        </>
      )}

      {!!data.referencias && (
        <>
          <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
            Referências
          </p>
          <p className={`text-gray-700 mb-7`}>{data.referencias}</p>
        </>
      )}

      {!!data.obs && (
        <>
          <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
            Observação
          </p>
          <p className={`text-gray-700 mb-7`}>{data.obs}</p>
        </>
      )}

      <div style={{ height: '400px', width: '100%' }}>
        <Map
          mapboxAccessToken="pk.eyJ1IjoidmluaWNpdXNvZnAiLCJhIjoiY2xveGhyNDViMDM0aDJscGRzenIzdnQ2ciJ9.saDzuYHiKktk1HiXkjn5Hg"
          initialViewState={{
            latitude: parseFloat(data.latitude.replace(',', '.')),
            longitude: parseFloat(data.longitude.replace(',', '.')),
            zoom: 11
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
        >
          <Marker
            longitude={parseFloat(data.longitude.replace(',', '.'))}
            latitude={parseFloat(data.latitude.replace(',', '.'))}
            anchor="bottom"
            color="#f00"
          />
        </Map>
      </div>
    </>
  );
};

export default function Ficha({ params }: { params: { id: string } }) {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  const { data, error } = useSWR(
    `https://script.google.com/macros/s/AKfycbx4K9IRhLfwN5zs5W-lxpJe-jzKJqyg3m5YIXGs8cq6BDezdk6hFD8muu6BNwyQNWhO-Q/exec?getRow=${params.id}`,
    fetcher
  );
  return (
    <>
      <div className="bg-teal-400 py-12">
        <div className="container max-w-5xl mx-auto border-l-2 border-white">
          <div className=" text-white container mx-auto max-w-3xl px-6">
            <p className="uppercase tracking-widest drop-shadow-sm">Catálogo</p>
            <h1
              className={`text-2xl md:text-4xl/tight tracking-relaxed drop-shadow-md ${libre.className}`}
            >
              Ficha Cadastral
            </h1>
          </div>
        </div>
      </div>
      <div className="container max-w-5xl mx-auto border-l-2 border-teal-400 mt-8 mb-12">
        <main className="container mx-auto max-w-3xl px-6 text-md leading-relaxed page-content">
          {!data ? (
            <p className="text-xl animate-pulse">Carregando...</p>
          ) : (
            <Article data={data} />
          )}
        </main>
      </div>
    </>
  );
}

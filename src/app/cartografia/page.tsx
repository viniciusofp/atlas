'use client';

import { Libre_Baskerville } from 'next/font/google';
import { Fragment, useEffect, useRef, useState } from 'react';
const libre = Libre_Baskerville({ weight: ['700'], subsets: ['latin'] });
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import useSWR from 'swr';
import Link from 'next/link';
import Map, { Marker } from 'react-map-gl';
import { sortBy } from 'lodash';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Cartografia() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [formValues, setFormValues] = useState({
    palavra: '',
    forma_aquisicao: '',
    ano: '',
    sort: '',
    order: ''
  });
  const [fichas, setFichas] = useState<any[]>([]);

  const { data, error } = useSWR(
    `https://script.google.com/macros/s/AKfycbx4K9IRhLfwN5zs5W-lxpJe-jzKJqyg3m5YIXGs8cq6BDezdk6hFD8muu6BNwyQNWhO-Q/exec?getFichas=search`,
    fetcher
  );
  // if (error) return 'Failed to load';
  // if (!data) return 'Loading...';

  useEffect(() => {
    if (data) setFichas(data);
  }, [data]);

  const submit = (values = formValues) => {
    let filteredFichas = [...data];
    if (values.palavra) {
      filteredFichas = filteredFichas.filter(r =>
        JSON.stringify(r).toLowerCase().includes(values.palavra.toLowerCase())
      );
    }
    if (values.forma_aquisicao) {
      filteredFichas = filteredFichas.filter(
        r => values.forma_aquisicao === r.aquisicao
      );
    }
    if (values.ano) {
      filteredFichas = filteredFichas.filter(r => {
        let interval = values.ano.split('-');
        let min = parseInt(interval[0]);
        let max = parseInt(interval[1]);
        return parseInt(r.ano) > min && parseInt(r.ano) < max;
      });
    }
    setFichas(filteredFichas);
  };

  const sort = (key: string) => {
    let filteredFichas = sortBy([...data], [key]);
    setFichas(filteredFichas);
  };

  return (
    <>
      <div className="bg-teal-100 pt-6 pb-5 border-y-2 border-t-teal-500 border-b-teal-100">
        <div className="relative container max-w-5xl mx-auto px-6">
          <p
            className={`text-sm drop-shadow-lg tracking-widest uppercase mb-3 underline decoration-teal-300 underline-offset-4 decoration-2 ${libre.className}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 float-left mr-2 stroke-teal-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            Busca avançada
          </p>
          <form
            onSubmit={e => {
              e.preventDefault();
              submit();
            }}
          >
            <div className="flex flex-row flex-wrap">
              <div className="sm:pr-3 mb-3 flex-none basis-full sm:basis-1/2 md:basis-3/12 mb-0">
                <label
                  htmlFor="palavra"
                  className="text-xs uppercase tracking-widest text-teal-800"
                >
                  Palavra-chave
                </label>
                <input
                  type="text"
                  name="palavra"
                  id="palavra"
                  className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-0 placeholder:text-teal-200 focus:ring-0 focus:ring-inset focus:ring-teal-200 text-sm sm:leading-6 border-[1px] border-white"
                  value={formValues.palavra}
                  onChange={e =>
                    setFormValues(values => ({
                      ...values,
                      palavra: e.target.value
                    }))
                  }
                />
              </div>
              <div className="md:pr-3 mb-3 flex-none basis-full sm:basis-1/2 md:basis-3/12 mb-0">
                <label
                  htmlFor="forma_aquisicao"
                  className="text-xs uppercase tracking-widest text-teal-800"
                >
                  Forma de Aquisição
                </label>
                <div className="border-white border-[1px] rounded-md mt-1 overflow-hidden">
                  <select
                    name="forma_aquisicao"
                    id="forma_aquisicao"
                    className="block w-full  border-0 py-1.5 pl-3 pr-0 text-gray-900 ring-0 placeholder:text-teal-200 focus:ring-0 focus:ring-inset focus:ring-teal-200 text-sm sm:leading-6 border-[1px] border-white border-r-8"
                    value={formValues.forma_aquisicao}
                    onChange={e =>
                      setFormValues(values => ({
                        ...values,
                        forma_aquisicao: e.target.value
                      }))
                    }
                  >
                    <option selected></option>
                    <option value="Arrendamento">Arrendamento</option>
                    <option value="Compra">Compra</option>
                    <option value="Doação">Doação</option>
                    <option value="Dote">Dote</option>
                    <option value="Herança">Herança</option>
                    <option value="Permuta">Permuta</option>
                    <option value="Sesmaria">Sesmaria</option>
                    <option value="Sucessão">Sucessão</option>
                  </select>
                </div>
              </div>
              <div className="pr-3 mb-3 flex-none basis-1/3 sm:basis-1/4 md:basis-2/12 mb-0">
                <label
                  htmlFor="ano"
                  className="text-xs uppercase tracking-widest text-teal-800"
                >
                  Ano
                </label>
                <div className="border-white border-[1px] rounded-md mt-1 overflow-hidden">
                  <select
                    name="ano"
                    id="ano"
                    className="block w-full  border-0 py-1.5 pl-3 pr-0 text-gray-900 ring-0 placeholder:text-teal-200 focus:ring-0 focus:ring-inset focus:ring-teal-200 text-sm sm:leading-6 border-[1px] border-white border-r-8"
                    value={formValues.ano}
                    onChange={e =>
                      setFormValues(values => ({
                        ...values,
                        ano: e.target.value
                      }))
                    }
                  >
                    <option selected></option>
                    <option value="1500-1550">1500 - 1550</option>
                    <option value="1550-1600">1550 - 1600</option>
                    <option value="1600-1650">1600 - 1650</option>
                    <option value="1650-1700">1650 - 1700</option>
                    <option value="1700-2023">1700+</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 flex-none basis-1/3  md:basis-1/12 mb-0 self-end">
                <button
                  className="bg-teal-700 text-white uppercase tracking-widest rounded-md py-1.5 px-5 text-xs hover:bg-teal-800  duration-150 ease-in  border-teal-700 leading-6"
                  onClick={e => {
                    e.preventDefault();
                    submit();
                  }}
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div style={{ height: '80vh', width: '100%' }}>
        <Map
          mapboxAccessToken="pk.eyJ1IjoidmluaWNpdXNvZnAiLCJhIjoiY2xveGhyNDViMDM0aDJscGRzenIzdnQ2ciJ9.saDzuYHiKktk1HiXkjn5Hg"
          initialViewState={{
            latitude: -23,
            longitude: -46,
            zoom: 6
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
        >
          {fichas
            .filter(
              f =>
                !isNaN(parseFloat(f.latitude.replace(',', '.'))) &&
                !isNaN(parseFloat(f.longitude.replace(',', '.')))
            )
            .map(ficha => (
              <Marker
                key={`marker_${ficha.row}`}
                longitude={parseFloat(ficha.longitude.replace(',', '.'))}
                latitude={parseFloat(ficha.latitude.replace(',', '.'))}
                anchor="bottom"
                color="#f00"
              />
            ))}
        </Map>
      </div>
    </>
  );
}

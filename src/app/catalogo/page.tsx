'use client';

import { Libre_Baskerville } from 'next/font/google';
import { Fragment, useEffect, useRef, useState } from 'react';
const libre = Libre_Baskerville({ weight: ['700'], subsets: ['latin'] });
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import useSWR from 'swr';
import Link from 'next/link';
import { sortBy } from 'lodash';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const usePagination = (items: any[], page = 1, perPage = 12) => {
  const [activePage, setActivePage] = useState(page);
  const totalPages = Math.ceil(items.length / perPage);
  const offset = perPage * (activePage - 1);
  const paginatedItems = items.slice(offset, perPage * activePage);

  return {
    activePage,
    nextPage: () => setActivePage(p => (p < totalPages ? p + 1 : p)),
    previousPage: () => setActivePage(p => (p > 1 ? p - 1 : p)),
    totalPages,
    totalItems: items.length,
    items: paginatedItems,
    goToFirstPage: () => setActivePage(1),
    goToLastPage: () => setActivePage(totalPages)
  };
};

export default function Catalogo({ params }: { params: { page: string } }) {
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

  const {
    activePage,
    nextPage,
    previousPage,
    totalPages,
    totalItems,
    items,
    goToFirstPage,
    goToLastPage
  } = usePagination(fichas);

  useEffect(() => {
    if (data) setFichas(data);
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 250, left: 0, behavior: 'instant' });
  }, [activePage]);

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
    goToFirstPage();
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
              <div className="mb-3 flex-none basis-1/3  md:basis-2/12 mb-0 self-end justify-self-end text-right">
                <button
                  onClick={e => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                  className=" text-slate-800 uppercase tracking-widest rounded-md py-1.5 px-5 text-xs hover:bg-teal-300  duration-150 ease-in border-[2px] border-teal-300 leading-5"
                >
                  Ordenar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap justify-center container max-w-5xl mx-auto px-6 border-teal-400 mt-5 justify-between">
        <div className="self-center">
          <p className="text-sm mb-0">
            Exibindo {items.length} de {totalItems} propriedades encontradas.
          </p>
        </div>
        <button
          className="bg-white text-teal-500 uppercase tracking-widest rounded-md py-1.5 px-2 text-xs hover:bg-teal-100 hover:text-teal-600 duration-150 ease-in  border-teal-700 leading-6 cursor-pointer self-center"
          onClick={() => {
            setFormValues({
              palavra: '',
              forma_aquisicao: '',
              ano: '',
              sort: '',
              order: ''
            });
            submit({
              palavra: '',
              forma_aquisicao: '',
              ano: '',
              sort: '',
              order: ''
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 inline-block mr-2 relative top-[-2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Limpar filtros
        </button>
      </div>
      {items.length === 0 && data && (
        <div className="flex gap-2 flex-wrap justify-center container max-w-5xl mx-auto px-6 border-teal-400 mt-5 justify-between">
          <div className="self-center">
            <p className="text-xl text-gray-700 mb-2 text-center">
              Não encontramos propriedades que correspondam à sua busca.
            </p>
            <p
              className="text-sm underline text-teal-400 cursor-pointer hover:text-teal-500 "
              onClick={() => {
                setFormValues({
                  palavra: '',
                  forma_aquisicao: '',
                  ano: '',
                  sort: '',
                  order: ''
                });
                submit({
                  palavra: '',
                  forma_aquisicao: '',
                  ano: '',
                  sort: '',
                  order: ''
                });
              }}
            >
              Tente limpar os filtros.
            </p>
          </div>
        </div>
      )}

      <div className="container max-w-5xl mx-auto px-6 border-teal-400 mb-12">
        {data ? (
          items.map((d: any) => (
            <div
              key={`catalogo_${d.row}`}
              className="flex flex-col md:flex-row border-[1px] border-teal-100 bg-teal-50 rounded-lg my-5 px-5 pb-3 pt-7"
            >
              <div className="flex-none basis-full md:basis-1/3 pr-5">
                <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
                  Proprietário
                </p>
                <h3 className={`text-xl mb-0 ${libre.className}`}>
                  {d.proprietario}
                </h3>
                {!!d.ocupacao && (
                  <p className="text-sm text-gray-700 mb-0 mt-3">
                    {d.ocupacao}
                  </p>
                )}
                <Link href={`/ficha/${d.row}`}>
                  <button className="bg-teal-400 text-white uppercase tracking-widest font-bold rounded-md py-1.5 px-5 text-xs sm:leading-6 hover:bg-teal-500  duration-150 ease-in border-[1px] border-teal-400 mb-5 mt-7 ">
                    Acessar Ficha
                  </button>
                </Link>
              </div>
              <div className="flex-none basis-full md:basis-2/3">
                <div className="flex flex-row">
                  {!!d.ano && (
                    <div className="flex-none basis-1/3">
                      <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
                        Ano
                      </p>
                      <p className={`text-xl ${libre.className}`}>{d.ano}</p>
                    </div>
                  )}

                  {!!d.aquisicao && (
                    <div className="flex-none basis-1/3">
                      <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
                        Aquisição
                      </p>
                      <p className={`text-xl ${libre.className}`}>
                        {d.aquisicao}
                      </p>
                    </div>
                  )}

                  {!!d.local && (
                    <div className="flex-none basis-1/3">
                      <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
                        Local
                      </p>
                      <p className={`text-xl ${libre.className}`}>{d.local}</p>
                    </div>
                  )}
                </div>
                <div className="flex-none basis-full">
                  <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">
                    Descrição resumida
                  </p>
                  <p className="text-sm text-gray-700">
                    {d.descricao.substring(0, 300)}
                    {d.descricao.length > 300 && ' [...]'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="animate-pulse text-xl text-gray-700 mb-2 text-center">
            Carregando...
          </p>
        )}
      </div>
      <div className="flex gap-2 flex-wrap justify-center container max-w-5xl mx-auto px-6 border-teal-400 mb-12">
        <button
          className="bg-teal-400 text-white uppercase tracking-widest rounded-md py-1.5 px-2 text-xs hover:bg-teal-800  duration-150 ease-in  border-teal-700 leading-6 cursor-pointer disabled:bg-gray-300 disabled:pointer-events-none"
          onClick={goToFirstPage}
          disabled={activePage <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline-block relative top-[-1px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="bg-teal-400 text-white uppercase tracking-widest rounded-md py-1.5 pl-3 pr-5 text-xs hover:bg-teal-800  duration-150 ease-in  border-teal-700 leading-6 cursor-pointer disabled:bg-gray-300 disabled:pointer-events-none"
          onClick={previousPage}
          disabled={activePage <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline-block relative top-[-1px] mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
          Página Anterior
        </button>
        <button
          className="bg-teal-400 text-white uppercase tracking-widest rounded-md py-1.5 pr-3 pl-5 text-xs hover:bg-teal-800  duration-150 ease-in  border-teal-700 leading-6 cursor-pointer disabled:bg-gray-300 disabled:pointer-events-none"
          onClick={nextPage}
          disabled={activePage >= totalPages}
        >
          Próxima Página
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline-block relative top-[-1px] ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>
        <button
          className="bg-teal-400 text-white uppercase tracking-widest rounded-md py-1.5 px-2 text-xs hover:bg-teal-800  duration-150 ease-in  border-teal-700 leading-6 cursor-pointer disabled:bg-gray-300 disabled:pointer-events-none"
          onClick={goToLastPage}
          disabled={activePage >= totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline-block relative top-[-1px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <div className="pt-3 basis-full text-center">
          <p className="text-xs">
            Página {activePage} de {totalPages}
          </p>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start w-full grow">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900 mb-3"
                        >
                          Ordenar por
                        </Dialog.Title>
                        <div className="flex flex-row gap-3 flex-wrap">
                          <button
                            onClick={() => {
                              sort('proprietario');
                              setOpen(false);
                            }}
                            className="w-full text-slate-800 uppercase tracking-widest rounded-md py-1.5 px-5 text-xs hover:bg-teal-300  duration-150 ease-in border-[1px] border-teal-300 leading-5"
                          >
                            Proprietário
                          </button>
                          <button
                            onClick={() => {
                              sort('ano');
                              setOpen(false);
                            }}
                            className="w-full text-slate-800 uppercase tracking-widest rounded-md py-1.5 px-5 text-xs hover:bg-teal-300  duration-150 ease-in border-[1px] border-teal-300 leading-5"
                          >
                            Ano
                          </button>
                          <button
                            onClick={() => {
                              sort('local');
                              setOpen(false);
                            }}
                            className="w-full text-slate-800 uppercase tracking-widest rounded-md py-1.5 px-5 text-xs hover:bg-teal-300  duration-150 ease-in border-[1px] border-teal-300 leading-5"
                          >
                            Local
                          </button>
                          <button
                            onClick={() => {
                              sort('aquisicao');
                              setOpen(false);
                            }}
                            className="w-full text-slate-800 uppercase tracking-widest rounded-md py-1.5 px-5 text-xs hover:bg-teal-300  duration-150 ease-in border-[1px] border-teal-300 leading-5"
                          >
                            Forma de aquisição
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

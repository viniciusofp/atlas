'use client';

import { Libre_Baskerville } from 'next/font/google';
import Link from 'next/link';
const libre = Libre_Baskerville({ weight: ['400', '700'], subsets: ['latin'] });
import { usePathname } from 'next/navigation';
import Layout from '../[page]/layout';

const navItems = [
  { label: 'Início', url: '/' },
  { label: 'Sobre', url: '/sobre' },
  { label: 'Catálogo', url: '/catalogo' },
  { label: 'Cartografia', url: '/cartografia' },
  { label: 'Equipe', url: '/equipe' }
];

export default Layout;

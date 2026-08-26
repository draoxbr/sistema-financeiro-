'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      setAutenticado(true);
    }
  }, [router]);

  if (!autenticado) {
    return null;
  }

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Painel de Controle de Empréstimos</h1>
        <p>Utilize o menu acima para gerenciar clientes ou realizar simulações de crédito.</p>
      </main>
    </div>
  );
}
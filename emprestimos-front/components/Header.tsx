'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    router.push('/login');
  };

  return (
    <header style={{
      backgroundColor: '#162238',
      borderBottom: '1px solid #233554',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#ffffff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', textDecoration: 'none' }}>
          💰 SistemaFinanceiro
        </Link>

        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/clientes" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem' }}>
            Clientes
          </Link>
          <Link href="/clientes/novo" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem' }}>
            Novo Cliente
          </Link>
          <Link href="/analise" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem' }}>
            Análise de Crédito
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #ef4444',
          color: '#fca5a5',
          padding: '0.4rem 0.85rem',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 600,
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#ef4444';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#fca5a5';
        }}
      >
        Sair
      </button>
    </header>
  );
}
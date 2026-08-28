'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    router.push('/login');
  };

  return (
    <header style={{
      backgroundColor: '#162238',
      borderBottom: '1px solid #233554',
      padding: '0.875rem 1.5rem',
      position: 'relative',
      color: '#ffffff'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Logo na Esquerda */}
        <Link href="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', textDecoration: 'none' }}>
          💰 SistemaFinanceiro
        </Link>

        {/* Lado Direito (Desktop): Links da Navegação + Botão Sair no final da tela */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          
          {/* Navegação Desktop */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/clientes" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>
              Clientes
            </Link>
            <Link href="/clientes/novo" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>
              Novo Cliente
            </Link>
            <Link href="/analise" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>
              Análise de Crédito
            </Link>
          </nav>

          {/* Botão Sair */}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            Sair
          </button>

          {/* Botão dos 3 Pontinhos (Mobile) */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="mobile-menu-btn"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0 0.25rem',
              lineHeight: 1
            }}
            aria-label="Abrir Menu"
          >
            ⋮
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {menuAberto && (
        <nav style={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          marginTop: '0.75rem',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <Link 
            href="/clientes" 
            onClick={() => setMenuAberto(false)}
            style={{ color: '#f8fafc', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px' }}
          >
            Clientes
          </Link>
          <Link 
            href="/clientes/novo" 
            onClick={() => setMenuAberto(false)}
            style={{ color: '#f8fafc', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px' }}
          >
            Novo Cliente
          </Link>
          <Link 
            href="/analise" 
            onClick={() => setMenuAberto(false)}
            style={{ color: '#f8fafc', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px' }}
          >
            Análise de Crédito
          </Link>
        </nav>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
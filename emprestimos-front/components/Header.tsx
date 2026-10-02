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
      backgroundColor: '#1b1326', // Lilás escuro profundo
      borderBottom: '1px solid #332147', // Borda lilás sutil
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
        <Link href="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e9d5ff', textDecoration: 'none' }}>
          💰 SistemaFinanceiro
        </Link>

        {/* Lado Direito (Desktop): Links da Navegação + Botão Sair */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          
          {/* Navegação Desktop */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/clientes" className="nav-link">
              Clientes
            </Link>
            <Link href="/clientes/novo" className="nav-link">
              Novo Cliente
            </Link>
            <Link href="/analise" className="nav-link">
              Análise de Crédito
            </Link>
          </nav>

          {/* Botão Sair */}
          <button
            onClick={handleLogout}
            className="btn-sair"
          >
            Sair
          </button>

          {/* Botão dos 3 Pontinhos (Mobile) */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="mobile-menu-btn"
            aria-label="Abrir Menu"
          >
            ⋮
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {menuAberto && (
        <nav style={{
          backgroundColor: '#261b36',
          border: '1px solid #4c2d6b',
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
            className="mobile-nav-link"
          >
            Clientes
          </Link>
          <Link 
            href="/clientes/novo" 
            onClick={() => setMenuAberto(false)}
            className="mobile-nav-link"
          >
            Novo Cliente
          </Link>
          <Link 
            href="/analise" 
            onClick={() => setMenuAberto(false)}
            className="mobile-nav-link"
          >
            Análise de Crédito
          </Link>
        </nav>
      )}

      <style jsx>{`
        .nav-link {
          color: #d8b4fe;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #ffffff;
        }

        .mobile-nav-link {
          color: #f3e8ff;
          text-decoration: none;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        .mobile-nav-link:hover {
          background-color: #3b2852;
        }

        .btn-sair {
          background-color: transparent;
          border: 1px solid #a855f7;
          color: #e9d5ff;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-sair:hover {
          background-color: #a855f7;
          color: #ffffff;
        }

        .mobile-menu-btn {
          background-color: transparent;
          border: none;
          color: #e9d5ff;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0 0.25rem;
          line-height: 1;
        }

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
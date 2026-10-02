'use client';

import { useState, useEffect } from 'react';
import { Cliente } from '@/types';
import Link from 'next/link';

interface Props {
  clientes: Cliente[];
  onDelete: (id: number) => void;
}

export default function ClienteTable({ clientes = [], onDelete }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Executa na montagem
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (clientes.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '2rem', color: '#c084fc' }}>
        Nenhum cliente cadastrado.
      </p>
    );
  }

  // --- VISÃO MOBILE (CARDS) ---
  if (isMobile) {
    return (
      <div style={{ width: '100%', paddingBottom: '3rem' }}>
        {clientes.map((c) => (
          <div
            key={c.id}
            style={{
              backgroundColor: '#261b36',
              border: '1px solid #4c2d6b',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#c084fc' }}>#{c.id}</span>
              <span style={{ background: '#3b2852', color: '#e9d5ff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #6b21a8' }}>
                {c.estado}
              </span>
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ffffff' }}>
              {c.nome}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#d8b4fe' }}>
              <span>CPF: {c.cpf}</span>
              <span>{c.idade} anos</span>
            </div>

            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#34d399', marginTop: '0.2rem' }}>
              R$ {Number(c.renda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #332147' }}>
              <Link href={`/clientes/${c.id}`} className="btn-editar" style={{ flex: 1, textAlign: 'center', padding: '0.5rem', fontSize: '0.85rem', borderRadius: '6px', textDecoration: 'none' }}>
                Editar
              </Link>
              <button onClick={() => c.id && onDelete(c.id)} className="btn-excluir" style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', borderRadius: '6px' }}>
                Excluir
              </button>
            </div>
          </div>
        ))}

        <style jsx>{`
          .btn-editar {
            background-color: #a855f7;
            color: #ffffff;
            font-weight: 600;
            transition: background-color 0.2s;
          }
          .btn-editar:hover {
            background-color: #9333ea;
          }
          .btn-excluir {
            background-color: transparent;
            border: 1px solid #ef4444;
            color: #fca5a5;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }
          .btn-excluir:hover {
            background-color: #ef4444;
            color: #ffffff;
          }
        `}</style>
      </div>
    );
  }

  // --- VISÃO DESKTOP (TABELA) ---
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '12px',
        border: '1px solid #4c2d6b',
        backgroundColor: '#261b36',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#f3e8ff' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #4c2d6b', backgroundColor: '#1b1326' }}>
            <th style={{ padding: '0.85rem 1rem', color: '#e9d5ff' }}>ID</th>
            <th style={{ padding: '0.85rem 1rem', color: '#e9d5ff' }}>Nome</th>
            <th style={{ padding: '0.85rem 1rem', color: '#e9d5ff' }}>CPF</th>
            <th style={{ padding: '0.85rem 1rem', color: '#e9d5ff' }}>Idade</th>
            <th style={{ padding: '0.85rem 1rem', color: '#e9d5ff' }}>Renda</th>
            <th style={{ padding: '0.85rem 1rem', color: '#e9d5ff' }}>UF</th>
            <th style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#e9d5ff' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #332147' }}>
              <td style={{ padding: '0.85rem 1rem', color: '#c084fc' }}>#{c.id}</td>
              <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#ffffff' }}>{c.nome}</td>
              <td style={{ padding: '0.85rem 1rem', color: '#d8b4fe' }}>{c.cpf}</td>
              <td style={{ padding: '0.85rem 1rem', color: '#d8b4fe' }}>{c.idade} anos</td>
              <td style={{ padding: '0.85rem 1rem', color: '#34d399', fontWeight: 600 }}>
                R$ {Number(c.renda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td style={{ padding: '0.85rem 1rem' }}>
                <span style={{ background: '#3b2852', color: '#e9d5ff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid #6b21a8' }}>
                  {c.estado}
                </span>
              </td>
              <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <Link href={`/clientes/${c.id}`} className="btn-editar-dt" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderRadius: '6px', textDecoration: 'none' }}>
                    Editar
                  </Link>
                  <button onClick={() => c.id && onDelete(c.id)} className="btn-excluir-dt" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderRadius: '6px' }}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .btn-editar-dt {
          background-color: #a855f7;
          color: #ffffff;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn-editar-dt:hover {
          background-color: #9333ea;
        }
        .btn-excluir-dt {
          background-color: transparent;
          border: 1px solid #ef4444;
          color: #fca5a5;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-excluir-dt:hover {
          background-color: #ef4444;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
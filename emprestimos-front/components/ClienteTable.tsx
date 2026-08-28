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
      <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
        Nenhum cliente cadastrado.
      </p>
    );
  }

  // RENDERIZAÇÃO MOBILE: CARDS (com respiro no final da página)
  if (isMobile) {
    return (
      <div style={{ width: '100%', paddingBottom: '3rem' }}>
        {clientes.map((c) => (
          <div
            key={c.id}
            style={{
              backgroundColor: 'var(--bg-card, #1e293b)',
              border: '1px solid var(--border, #334155)',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>#{c.id}</span>
              <span style={{ background: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {c.estado}
              </span>
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ffffff' }}>
              {c.nome}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#cbd5e1' }}>
              <span>CPF: {c.cpf}</span>
              <span>{c.idade} anos</span>
            </div>

            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10b981', marginTop: '0.2rem' }}>
              R$ {Number(c.renda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Link href={`/clientes/${c.id}`} className="btn" style={{ flex: 1, textAlign: 'center', padding: '0.5rem', fontSize: '0.85rem' }}>
                Editar
              </Link>
              <button onClick={() => c.id && onDelete(c.id)} className="btn btn-danger" style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // RENDERIZAÇÃO DESKTOP: TABELA
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '12px',
        border: '1px solid var(--border, #334155)',
        backgroundColor: 'var(--bg-card, #1e293b)',
        overflow: 'hidden'
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#182234' }}>
            <th style={{ padding: '0.85rem 1rem' }}>ID</th>
            <th style={{ padding: '0.85rem 1rem' }}>Nome</th>
            <th style={{ padding: '0.85rem 1rem' }}>CPF</th>
            <th style={{ padding: '0.85rem 1rem' }}>Idade</th>
            <th style={{ padding: '0.85rem 1rem' }}>Renda</th>
            <th style={{ padding: '0.85rem 1rem' }}>UF</th>
            <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '0.85rem 1rem' }}>#{c.id}</td>
              <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{c.nome}</td>
              <td style={{ padding: '0.85rem 1rem' }}>{c.cpf}</td>
              <td style={{ padding: '0.85rem 1rem' }}>{c.idade} anos</td>
              <td style={{ padding: '0.85rem 1rem', color: '#10b981', fontWeight: 600 }}>
                R$ {Number(c.renda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td style={{ padding: '0.85rem 1rem' }}>
                <span style={{ background: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {c.estado}
                </span>
              </td>
              <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <Link href={`/clientes/${c.id}`} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    Editar
                  </Link>
                  <button onClick={() => c.id && onDelete(c.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
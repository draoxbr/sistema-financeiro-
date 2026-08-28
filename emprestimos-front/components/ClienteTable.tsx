'use client';
import { Cliente } from '@/types';
import Link from 'next/link';

interface Props {
  clientes: Cliente[];
  onDelete: (id: number) => void;
}

export default function ClienteTable({ clientes = [], onDelete }: Props) {
  return (
    <div 
      className="table-container" 
      style={{ 
        width: '100%', 
        overflowX: 'auto', // Permite scroll horizontal no celular sem quebrar o layout da tela
        borderRadius: '8px',
        border: '1px solid var(--border, #334155)',
        backgroundColor: 'var(--bg-card, #1e293b)'
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border, #334155)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <th style={{ padding: '0.75rem 1rem' }}>ID</th>
            <th style={{ padding: '0.75rem 1rem' }}>Nome</th>
            <th style={{ padding: '0.75rem 1rem' }}>CPF</th>
            <th style={{ padding: '0.75rem 1rem' }}>Idade</th>
            <th style={{ padding: '0.75rem 1rem' }}>Renda</th>
            <th style={{ padding: '0.75rem 1rem' }}>UF</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>#{c.id}</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{c.nome}</td>
                <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>{c.cpf}</td>
                <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>{c.idade} anos</td>
                <td style={{ padding: '0.75rem 1rem', color: '#10b981', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  R$ {Number(c.renda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                  <span style={{ background: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                    {c.estado}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Link href={`/clientes/${c.id}`} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                      Editar
                    </Link>
                    <button onClick={() => c.id && onDelete(c.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                Nenhum cliente cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
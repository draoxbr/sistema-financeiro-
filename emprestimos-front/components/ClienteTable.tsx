'use client';
import { Cliente } from '@/types';
import Link from 'next/link';

interface Props {
  clientes: Cliente[];
  onDelete: (id: number) => void;
}

export default function ClienteTable({ clientes = [], onDelete }: Props) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Idade</th>
            <th>Renda</th>
            <th>UF</th>
            <th style={{ textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((c) => (
              <tr key={c.id}>
                <td>#{c.id}</td>
                <td style={{ fontWeight: 600 }}>{c.nome}</td>
                <td>{c.cpf}</td>
                <td>{c.idade} anos</td>
                <td style={{ color: '#10b981', fontWeight: 600 }}>
                  R$ {Number(c.renda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td><span style={{ background: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{c.estado}</span></td>
                <td style={{ textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <Link href={`/clientes/${c.id}`} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Editar</Link>
                  <button onClick={() => c.id && onDelete(c.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Excluir</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Nenhum cliente cadastrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
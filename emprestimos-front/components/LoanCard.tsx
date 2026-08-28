import { Emprestimo } from '@/types';

export default function LoanCard({ emprestimo }: { emprestimo: Emprestimo }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.25rem',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>{emprestimo.tipo}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Taxa de Juros</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginTop: '0.2rem' }}>
        {emprestimo.taxa_juros}% <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/a.m.</span>
      </p>
    </div>
  );
}
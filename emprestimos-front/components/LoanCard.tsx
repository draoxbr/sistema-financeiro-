import { Emprestimo } from '@/types';

export default function LoanCard({ emprestimo }: { emprestimo: Emprestimo }) {
  return (
    <div style={{
      backgroundColor: '#261b36', // Lilás escuro do card
      border: '1px solid #4c2d6b', // Borda lilás vibrante
      borderRadius: '12px',
      padding: '1.25rem',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 4px 12px rgba(168, 85, 247, 0.1)', // Sombra suave arroxeada
      transition: 'transform 0.2s ease, border-color 0.2s ease'
    }}>
      {/* Título do tipo de empréstimo em lilás claro vibrante */}
      <h3 style={{ 
        fontSize: '1.1rem', 
        marginBottom: '0.5rem', 
        color: '#e9d5ff', 
        fontWeight: '600' 
      }}>
        {emprestimo.tipo}
      </h3>

      {/* Rótulo secundário em tom lilás opaco */}
      <p style={{ color: '#c084fc', fontSize: '0.875rem' }}>Taxa de Juros</p>

      {/* Destaque do valor com verde/esmeralda suave e sufixo em lilás */}
      <p style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        color: '#34d399', 
        marginTop: '0.2rem',
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.3rem'
      }}>
        {emprestimo.taxa_juros}% 
        <span style={{ fontSize: '0.8rem', color: '#d8b4fe', fontWeight: 'normal' }}>
          /a.m.
        </span>
      </p>
    </div>
  );
}
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>
        💰 Sistema<span style={{ color: 'var(--accent)' }}>Finaceiro</span>
      </h2>
      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/clientes" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Clientes</Link>
        <Link href="/clientes/novo" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Novo Cliente</Link>
        <Link href="/analise" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Análise de Crédito</Link>
      </nav>
    </header>
  );
}
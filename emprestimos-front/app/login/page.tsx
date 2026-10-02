'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const data = await api.login(email, senha);

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      router.push('/');
    } catch (err: any) {
      setErro(err.message || 'E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#130d1d', // Fundo bem escuro levemente roxo
      padding: '1.5rem',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '2.5rem 2rem',
        borderRadius: '12px',
        backgroundColor: '#261b36',
        border: '1px solid #4c2d6b',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        color: '#ffffff'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#e9d5ff' }}>
            💰 Sistema Financeiro 💰
          </h1>
          <p style={{ color: '#c084fc', fontSize: '0.925rem', margin: 0 }}>
            Insira suas credenciais para acessar o painel
          </p>
        </div>

        {erro && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#fca5a5',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#e9d5ff' }}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label htmlFor="senha" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#e9d5ff' }}>
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-entrar"
          >
            {loading ? 'Autenticando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#d8b4fe' }}>
          Não tem uma conta?{' '}
          <Link href="/cadastro" style={{ color: '#c084fc', textDecoration: 'none', fontWeight: 600 }}>
            Cadastre-se
          </Link>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          border: 1px solid #4c2d6b;
          background-color: #1b1326;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field::placeholder {
          color: #8b5cf6;
          opacity: 0.6;
        }
        .input-field:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.25);
        }

        .btn-entrar {
          width: 100%;
          padding: 0.85rem;
          border-radius: 6px;
          border: none;
          background-color: #a855f7;
          color: #ffffff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease, opacity 0.2s ease;
        }
        .btn-entrar:hover:not(:disabled) {
          background-color: #9333ea;
        }
        .btn-entrar:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>
    </main>
  );
}
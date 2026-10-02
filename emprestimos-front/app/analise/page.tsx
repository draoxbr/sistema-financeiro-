'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { ClienteApiRepository } from '@/repositories/ClienteApiRepository';
import { ClienteService } from '@/services/ClienteService';
import { EmprestimoApiRepository } from '@/repositories/EmprestimoApiRepository';
import { EmprestimoService } from '@/services/EmprestimoService';
import { ResultadoAnalise, Cliente } from '@/types';
import LoanCard from '@/components/LoanCard';

// Injeção de Dependências
const clienteRepo = new ClienteApiRepository();
const clienteService = new ClienteService(clienteRepo);

const emprestimoRepo = new EmprestimoApiRepository();
const emprestimoService = new EmprestimoService(emprestimoRepo);

export default function AnalisePage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionadoId, setClienteSelecionadoId] = useState<string>('');

  const [form, setForm] = useState({
    nome: '',
    idade: 0,
    renda: 0,
    estado: '',
  });

  const [resultado, setResultado] = useState<ResultadoAnalise | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarClientes() {
      try {
        const listaClientes = await clienteService.listarClientes();
        setClientes(listaClientes);
      } catch (err) {
        console.error('Erro ao carregar clientes:', err);
      }
    }
    carregarClientes();
  }, []);

  const handleSelecionarCliente = (id: string) => {
    setClienteSelecionadoId(id);
    const clienteEncontrado = clientes.find((c) => String(c.id) === id);

    if (clienteEncontrado) {
      setForm({
        nome: clienteEncontrado.nome,
        idade: Number(clienteEncontrado.idade),
        renda: Number(clienteEncontrado.renda),
        estado: clienteEncontrado.estado || '',
      });
    } else {
      setForm({ nome: '', idade: 0, renda: 0, estado: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSelecionadoId) {
      alert('Por favor, selecione um cliente cadastrado.');
      return;
    }

    setLoading(true);
    try {
      const data = await emprestimoService.analisarEmprestimo(form);
      setResultado(data);
      alert('Análise de crédito realizada com sucesso!');
    } catch (err: any) {
      alert(err.message || 'Erro ao realizar análise de crédito.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#130d1d' }}>
      <Header />
      
      <main 
        className="container" 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: '2rem 1rem 3.5rem 1rem',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ width: '100%', maxWidth: '520px', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#e9d5ff' }}>Análise de Crédito</h1>
        </div>

        <div 
          className="form-card" 
          style={{ 
            width: '100%', 
            maxWidth: '520px',
            backgroundColor: '#261b36',
            border: '1px solid #4c2d6b',
            borderRadius: '12px',
            padding: '1.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            boxSizing: 'border-box'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#e9d5ff' }}>
                Selecionar Cliente Cadastrado
              </label>
              <select
                value={clienteSelecionadoId}
                onChange={(e) => handleSelecionarCliente(e.target.value)}
                required
                className="input-field select-field"
              >
                <option value="">-- Selecione um cliente --</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome} (ID: {c.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#e9d5ff' }}>
                Nome Completo
              </label>
              <input 
                type="text" 
                value={form.nome} 
                readOnly 
                disabled 
                placeholder="Selecione um cliente acima" 
                className="input-field input-disabled"
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#e9d5ff' }}>
                Idade
              </label>
              <input 
                type="number" 
                value={form.idade || ''} 
                readOnly 
                disabled 
                placeholder="Selecione um cliente acima" 
                className="input-field input-disabled"
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#e9d5ff' }}>
                Renda Mensal (R$)
              </label>
              <input 
                type="number" 
                value={form.renda || ''} 
                readOnly 
                disabled 
                placeholder="Selecione um cliente acima" 
                className="input-field input-disabled"
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#e9d5ff' }}>
                Estado (UF)
              </label>
              <input 
                type="text" 
                value={form.estado} 
                readOnly 
                disabled 
                placeholder="Selecione um cliente acima" 
                className="input-field input-disabled"
              />
            </div>

            <button 
              type="submit" 
              className="btn-analisar" 
              disabled={loading}
            >
              {loading ? 'Analisando...' : 'Simular Empréstimos'}
            </button>
          </form>
        </div>

        {resultado && (
          <div style={{ marginTop: '2.5rem', width: '100%', maxWidth: '520px' }}>
            <h2 style={{ marginBottom: '1.2rem', color: '#e9d5ff', fontSize: '1.3rem', fontWeight: 600 }}>
              Empréstimos Elegíveis para <span style={{ color: '#c084fc', fontWeight: 700 }}>{resultado.cliente}</span>
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '1rem',
              width: '100%' 
            }}>
              {resultado.emprestimos?.map((loan, idx) => (
                <LoanCard key={idx} emprestimo={loan} />
              ))}
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 8px;
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
          opacity: 0.5;
        }
        .input-field:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.25);
        }

        .select-field option {
          background-color: #1b1326;
          color: #ffffff;
        }

        .input-disabled {
          background-color: #140d1f;
          border-color: #38204d;
          color: #a78bfa;
          cursor: not-allowed;
        }

        .btn-analisar {
          width: 100%;
          padding: 0.85rem;
          margin-top: 0.5rem;
          border-radius: 8px;
          border: none;
          background-color: #a855f7;
          color: #ffffff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease, opacity 0.2s ease;
        }
        .btn-analisar:hover:not(:disabled) {
          background-color: #9333ea;
        }
        .btn-analisar:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
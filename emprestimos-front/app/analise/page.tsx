'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { api } from '@/services/api';
import { ResultadoAnalise, Cliente } from '@/types';
import LoanCard from '@/components/LoanCard';

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
        const listaClientes = await api.getClient();
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
      const data = await api.analisarEmprestimo(form);
      setResultado(data);
      alert('Análise de crédito realizada com sucesso!');
    } catch (err) {
      alert('Erro ao realizar análise de crédito.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '2rem', alignSelf: 'flex-start' }}>Análise de Crédito</h1>

        <div className="form-card" style={{ width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Selecionar Cliente Cadastrado</label>
              <select
                value={clienteSelecionadoId}
                onChange={(e) => handleSelecionarCliente(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '6px',
                  backgroundColor: '#1f2937',
                  color: '#fff',
                  border: '1px solid #374151',
                }}
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
              <label>Nome Completo</label>
              <input type="text" value={form.nome} readOnly disabled placeholder="Selecione um cliente acima" />
            </div>

            <div className="form-group">
              <label>Idade</label>
              <input type="number" value={form.idade || ''} readOnly disabled placeholder="Selecione um cliente acima" />
            </div>

            <div className="form-group">
              <label>Renda Mensal (R$)</label>
              <input type="number" value={form.renda || ''} readOnly disabled placeholder="Selecione um cliente acima" />
            </div>

            <div className="form-group">
              <label>Estado (UF)</label>
              <input type="text" value={form.estado} readOnly disabled placeholder="Selecione um cliente acima" />
            </div>

            <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Analisando...' : 'Simular Empréstimos'}
            </button>
          </form>
        </div>

        {resultado && (
          <div style={{ marginTop: '2.5rem', width: '100%' }}>
            <h2 style={{ marginBottom: '1.2rem', color: '#fff' }}>
              Empréstimos Elegíveis para <span style={{ color: 'var(--accent)' }}>{resultado.cliente}</span>
            </h2>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {resultado.emprestimos?.map((loan, idx) => (
                <LoanCard key={idx} emprestimo={loan} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
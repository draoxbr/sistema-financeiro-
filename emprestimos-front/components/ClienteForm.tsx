'use client';
import { useState, useEffect } from 'react';
import { Cliente } from '@/types';

interface EstadoIBGE {
  sigla: string;
  nome: string;
}

interface Props {
  initialData?: Cliente;
  onSubmit: (data: Cliente) => void;
}

export default function ClienteForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Cliente>(
    initialData || {
      nome: '',
      cpf: '',
      idade: 0,
      renda: 0,
      estado: '',
    }
  );

  const [estados, setEstados] = useState<EstadoIBGE[]>([]);

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?ordenacao=nome')
      .then((res) => res.json())
      .then((data: EstadoIBGE[]) => setEstados(data))
      .catch((err) => console.error('Erro ao buscar UFs:', err));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="form-card" style={{ width: '100%', maxWidth: '500px' }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            placeholder="Ex: Maria Silva"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={form.cpf || ''}
            onChange={(e) => setForm({ ...form, cpf: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Idade</label>
          <input
            type="number"
            placeholder="Ex: 28"
            value={form.idade || ''}
            onChange={(e) => setForm({ ...form, idade: Number(e.target.value) })}
            required
          />
        </div>

        <div className="form-group">
          <label>Renda Mensal (R$)</label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 3500.00"
            value={form.renda || ''}
            onChange={(e) => setForm({ ...form, renda: Number(e.target.value) })}
            required
          />
        </div>

        <div className="form-group">
          <label>Estado (UF)</label>
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
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
            <option value="">-- Selecione o Estado --</option>
            {estados.map((uf) => (
              <option key={uf.sigla} value={uf.sigla}>
                {uf.nome} ({uf.sigla})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
          Salvar Cliente
        </button>
      </form>
    </div>
  );
}
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
    <div 
      className="form-card" 
      style={{ 
        width: '100%', 
        maxWidth: '500px',
        margin: '0 auto',
        padding: '1.5rem',
        boxSizing: 'border-box',
        backgroundColor: '#261b36',
        border: '1px solid #4c2d6b',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#e9d5ff', fontWeight: 500 }}>
            Nome Completo
          </label>
          <input
            type="text"
            placeholder="Ex: Maria Silva"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#e9d5ff', fontWeight: 500 }}>
            CPF
          </label>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={form.cpf || ''}
            onChange={(e) => setForm({ ...form, cpf: e.target.value })}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#e9d5ff', fontWeight: 500 }}>
            Idade
          </label>
          <input
            type="number"
            placeholder="Ex: 28"
            value={form.idade || ''}
            onChange={(e) => setForm({ ...form, idade: Number(e.target.value) })}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#e9d5ff', fontWeight: 500 }}>
            Renda Mensal (R$)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 3500.00"
            value={form.renda || ''}
            onChange={(e) => setForm({ ...form, renda: Number(e.target.value) })}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#e9d5ff', fontWeight: 500 }}>
            Estado (UF)
          </label>
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
            required
            className="input-field select-field"
          >
            <option value="">-- Selecione o Estado --</option>
            {estados.map((uf) => (
              <option key={uf.sigla} value={uf.sigla}>
                {uf.nome} ({uf.sigla})
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="btn-salvar"
        >
          Salvar Cliente
        </button>
      </form>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.65rem 0.8rem;
          box-sizing: border-box;
          background-color: #1b1326;
          border: 1px solid #4c2d6b;
          border-radius: 8px;
          color: #f3e8ff;
          font-size: 0.9rem;
          outline: none;
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

        .select-field option {
          background-color: #1b1326;
          color: #f3e8ff;
        }

        .btn-salvar {
          width: 100%;
          padding: 0.75rem;
          margin-top: 0.5rem;
          cursor: pointer;
          background-color: #a855f7;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .btn-salvar:hover {
          background-color: #9333ea;
        }
        .btn-salvar:active {
          transform: scale(0.99);
        }
      `}</style>
    </div>
  );
}
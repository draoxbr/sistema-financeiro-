'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ClienteTable from '@/components/ClienteTable';
import { api } from '@/services/api';
import { Cliente } from '@/types';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const data = await api.getClient();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.excluirCliente(id);
        setClientes((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        alert('Erro ao excluir cliente.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main 
        className="container" 
        style={{ 
          flex: 1, 
          width: '100%', 
          maxWidth: '1100px', 
          margin: '0 auto', 
          padding: '1.5rem 1rem 4rem 1rem', 
          boxSizing: 'border-box' 
        }}
      >
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Lista de Clientes
        </h1>

        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Carregando clientes...</p>
        ) : (
          <div style={{ width: '100%' }}>
            <ClienteTable clientes={clientes} onDelete={handleDelete} />
          </div>
        )}
      </main>
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ClienteTable from '@/components/ClienteTable';
import { ClienteApiRepository } from '@/repositories/ClienteApiRepository';
import { ClienteService } from '@/services/ClienteService';
import { Cliente } from '@/types';

const clienteRepository = new ClienteApiRepository();
const clienteService = new ClienteService(clienteRepository);

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const data = await clienteService.listarClientes();
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
        await clienteService.removerCliente(id);
        setClientes((prev) => prev.filter((c) => c.id !== id));
      } catch (error: any) {
        alert(error.message || 'Erro ao excluir cliente.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#130d1d' }}>
      <Header />

      <main 
        className="container" 
        style={{ 
          flex: 1, 
          width: '100%', 
          maxWidth: '1100px', 
          margin: '0 auto', 
          padding: '2rem 1rem 4rem 1rem', 
          boxSizing: 'border-box' 
        }}
      >
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#e9d5ff' }}>
          Lista de Clientes
        </h1>

        {loading ? (
          <p style={{ color: '#c084fc', textAlign: 'center', padding: '2rem 0' }}>Carregando clientes...</p>
        ) : (
          <div style={{ width: '100%' }}>
            <ClienteTable clientes={clientes} onDelete={handleDelete} />
          </div>
        )}
      </main>
    </div>
  );
}
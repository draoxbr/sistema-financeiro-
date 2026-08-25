'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Cliente } from '@/types';
import Header from '@/components/Header';
import ClienteTable from '@/components/ClienteTable';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const carregar = async () => {
    try {
      const dados = await api.getClient();
      setClientes(dados);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  useEffect(() => { carregar(); }, []);

  const handleExcluir = async (id: number) => {
    if (confirm('Deseja mesmo excluir?')) {
      try {
        await api.excluirCliente(id);
        alert('Cliente excluído com sucesso!');
        carregar();
      } catch (error) {
        alert('Erro ao excluir o cliente. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Lista de Clientes</h1>
        <ClienteTable clientes={clientes} onDelete={handleExcluir} />
      </main>
    </div>
  );
}
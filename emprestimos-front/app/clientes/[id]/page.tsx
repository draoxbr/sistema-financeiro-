'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ClienteApiRepository } from '@/repositories/ClienteApiRepository';
import { ClienteService } from '@/services/ClienteService';
import { Cliente } from '@/types';
import Header from '@/components/Header';
import ClienteForm from '@/components/ClienteForm';

// Instanciação e Injeção de Dependência
const clienteRepository = new ClienteApiRepository();
const clienteService = new ClienteService(clienteRepository);

export default function EditarClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const clienteEncontrado = await clienteService.obterClientePorId(Number(id));
        setCliente(clienteEncontrado);
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    };

    carregarCliente();
  }, [id]);

  const handleSave = async (data: Cliente) => {
    try {
      await clienteService.atualizarCliente(Number(id), data);
      alert('Cliente atualizado com sucesso!');
      router.push('/clientes');
    } catch (error: any) {
      alert(error.message || 'Erro ao salvar cliente. Tente novamente.');
    }
  };

  return (
    <div>
      <Header />
      <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '2rem', alignSelf: 'flex-start' }}>Editar Cliente</h1>
        {cliente && <ClienteForm initialData={cliente} onSubmit={handleSave} />}
      </main>
    </div>
  );
}
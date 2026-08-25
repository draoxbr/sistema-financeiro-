'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Cliente } from '@/types';
import Header from '@/components/Header';
import ClienteForm from '@/components/ClienteForm';

export default function EditarClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    api.getClientePorId(id).then(setCliente);
  }, [id]);

  const handleSave = async (data: Cliente) => {
    try {
      await api.atualizarCliente(id, data);
      alert('Cliente atualizado com sucesso!');
      router.push('/clientes');
    } catch (error) {
      alert('Erro ao salvar cliente. Tente novamente.');
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
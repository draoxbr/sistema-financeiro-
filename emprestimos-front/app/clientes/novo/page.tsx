'use client';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Cliente } from '@/types';
import Header from '@/components/Header';
import ClienteForm from '@/components/ClienteForm';

export default function NovoClientePage() {
  const router = useRouter();

  const handleSave = async (data: Cliente) => {
    try {
      await api.criarCliente(data);
      alert('Cliente cadastrado com sucesso!');
      router.push('/clientes');
    } catch (error) {
      console.log(error)
      alert('Erro ao cadastrar cliente. Tente novamente.');
    }
  };

  return (
    <div>
      <Header />
      <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '2rem', alignSelf: 'flex-start' }}>Cadastrar Novo Cliente</h1>
        <ClienteForm onSubmit={handleSave} />
      </main>
    </div>
  );
}
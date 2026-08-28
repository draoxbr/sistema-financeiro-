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
      console.log(error);
      alert('Erro ao cadastrar cliente. Tente novamente.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '520px', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Cadastrar Novo Cliente</h1>
        </div>

        <ClienteForm onSubmit={handleSave} />
      </main>
    </div>
  );
}
'use client';
import { useRouter } from 'next/navigation';
import { ClienteApiRepository } from '@/repositories/ClienteApiRepository';
import { ClienteService } from '@/services/ClienteService';
import { Cliente } from '@/types';
import Header from '@/components/Header';
import ClienteForm from '@/components/ClienteForm';

const clienteRepository = new ClienteApiRepository();
const clienteService = new ClienteService(clienteRepository);

export default function NovoClientePage() {
  const router = useRouter();

  const handleSave = async (data: Cliente) => {
    try {
     
      await clienteService.criarCliente(data);
      alert('Cliente cadastrado com sucesso!');
      router.push('/clientes');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Erro ao cadastrar cliente. Tente novamente.');
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
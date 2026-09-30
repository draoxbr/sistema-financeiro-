import { IClienteRepository } from './IClienteRepository';
import { Cliente } from '@/types';
import { api } from '@/services/api';

export class ClienteApiRepository implements IClienteRepository {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  async obterTodos(): Promise<Cliente[]> {
    const res = await fetch(`${this.baseUrl}/clientes`);
    if (!res.ok) throw new Error('Erro ao buscar clientes');
    return res.json();
  }

  async obterPorId(id: number): Promise<Cliente | null> {
    const res = await fetch(`${this.baseUrl}/clientes/${id}`);
    if (!res.ok) return null;
    return res.json();
  }

  async excluir(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/clientes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao excluir cliente');
  }

  async criar(cliente: Cliente): Promise<Cliente> {
    return await api.criarCliente(cliente);
  }

  async atualizar(id: number, cliente: Cliente): Promise<Cliente> {
  const response = await fetch(`${this.baseUrl}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar cliente');
  }

    return await response.json(); 
  }
}
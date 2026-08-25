import { Cliente, ResultadoAnalise } from "@/types";

const API_URL = 'http://localhost:3001';

export const api = {
    async getClient(): Promise<Cliente[]> {
        const res = await fetch(`${API_URL}/clientes`, {cache: 'no-store'});
        return res.json();
    },

    async getClientePorId(id: string): Promise<Cliente> {
    const res = await fetch(`${API_URL}/clientes/${id}`, { cache: 'no-store' });
    return res.json();
  },
  async criarCliente(cliente: Cliente): Promise<Cliente> {
    const res = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    });
    return res.json();
  },

  async atualizarCliente(id: string, cliente: Cliente): Promise<void> {
    await fetch(`${API_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    });
  },

  async excluirCliente(id: number): Promise<void> {
    await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
  },

  async analisarEmprestimo(dados: { nome: string; idade: number; renda: number; estado: string }): Promise<ResultadoAnalise> {
    const res = await fetch(`${API_URL}/clientes-loans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    return res.json();
  }
}
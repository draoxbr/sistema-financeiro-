import { Cliente, ResultadoAnalise } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sistema-emprestimo-m965.onrender.com';

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  async getClient(): Promise<Cliente[]> {
    const res = await fetch(`${API_URL}/clientes`, {
      cache: 'no-store',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Erro ao buscar clientes.');
    return res.json();
  },

  async getClientePorId(id: string): Promise<Cliente> {
    const res = await fetch(`${API_URL}/clientes/${id}`, {
      cache: 'no-store',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Cliente não encontrado.');
    return res.json();
  },

  async criarCliente(cliente: Cliente): Promise<Cliente> {
    const res = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(cliente),
    });
    if (!res.ok) throw new Error('Erro ao criar cliente.');
    return res.json();
  },

  async atualizarCliente(id: string, cliente: Cliente): Promise<void> {
    const res = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(cliente),
    });
    if (!res.ok) throw new Error('Erro ao atualizar cliente.');
  },

  async excluirCliente(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Erro ao excluir cliente.');
  },

  async analisarEmprestimo(dados: { nome: string; idade: number; renda: number; estado: string }): Promise<ResultadoAnalise> {
    const res = await fetch(`${API_URL}/clientes-loans`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(dados),
    });
    if (!res.ok) throw new Error('Erro ao analisar empréstimo.');
    return res.json();
  },

  login: async (email: string, senha: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Erro ao realizar login');
    }

    return data;
  },

  cadastrar: async (nome: string, email: string, senha: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Erro ao criar conta');
    }

    return data;
  }
};
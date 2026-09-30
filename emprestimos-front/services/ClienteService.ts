import { IClienteRepository } from '@/repositories/IClienteRepository';
import { Cliente } from '@/types';

export class ClienteService {
  constructor(private clienteRepository: IClienteRepository) {}

  async listarClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.obterTodos();
  }

  async removerCliente(id: number): Promise<void> {
    if (id <= 0) {
      throw new Error('ID inválido para exclusão');
    }
    await this.clienteRepository.excluir(id);
    
  }

  async criarCliente(cliente: Cliente): Promise<Cliente> {
    if (!cliente.nome || cliente.nome.trim() === '') {
      throw new Error('O nome do cliente é obrigatório.');
    }
    return await this.clienteRepository.criar(cliente);
  }

  async atualizarCliente(id: number, cliente: Cliente): Promise<Cliente> {
  if (id <= 0) throw new Error('ID inválido.');
  if (!cliente.nome || cliente.nome.trim() === '') {
    throw new Error('O nome do cliente é obrigatório.');
  }
    return await this.clienteRepository.atualizar(id, cliente);
  }

  async obterClientePorId(id: number): Promise<Cliente | null> {
    if (id <= 0 || isNaN(id)) {
      throw new Error("ID inválido.");
    }
    return await this.clienteRepository.obterPorId(id);
  }

}
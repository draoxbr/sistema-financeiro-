import { IClienteRepository } from "../repositories/IClienteRepository";
import { ClienteService } from "../services/ClienteService";
import { Cliente } from "../types";

class MockClienteRepository implements IClienteRepository {
  private clientes: Cliente[] = [
    { id: 1, nome: 'João Silva', cpf: '12345678900', idade: 30, renda: 2500, estado: 'PE' },
    { id: 2, nome: 'Maria Souza', cpf: '98765432100', idade: 25, renda: 3200, estado: 'BA' }
  ];

  async obterTodos(): Promise<Cliente[]> {
    return this.clientes;
  }

  async obterPorId(id: number): Promise<Cliente | null> {
    return this.clientes.find((c) => c.id === id) || null;
  }

  async excluir(id: number): Promise<void> {
    this.clientes = this.clientes.filter((c) => c.id !== id);
  }

  async criar(cliente: Cliente): Promise<Cliente> {
    const novoCliente = { ...cliente, id: this.clientes.length + 1 };
    this.clientes.push(novoCliente);
    return novoCliente;
  }

  async atualizar(id: number, cliente: Cliente): Promise<Cliente> {
  const index = this.clientes.findIndex((c) => c.id === id);
  if (index !== -1) {
    this.clientes[index] = { ...cliente, id };
  }
    return this.clientes[index];
  }

}

describe('ClienteService (Testes Unitários - SOLID)', () => {
  let clienteRepository: IClienteRepository;
  let clienteService: ClienteService;

  beforeEach(() => {
    clienteRepository = new MockClienteRepository();
    clienteService = new ClienteService(clienteRepository);
  });

  test('Deve retornar a lista completa de clientes', async () => {
    const clientes = await clienteService.listarClientes();
    expect(clientes).toHaveLength(2);
    expect(clientes[0].nome).toBe('João Silva');
  });

  test('Deve excluir um cliente pelo ID com sucesso', async () => {
    await clienteService.removerCliente(1);
    const clientesRestantes = await clienteService.listarClientes();
    
    expect(clientesRestantes).toHaveLength(1);
    expect(clientesRestantes[0].id).toBe(2);
  });

  test('Deve lançar um erro ao tentar excluir um cliente com ID inválido (<= 0)', async () => {
    await expect(clienteService.removerCliente(0)).rejects.toThrow('ID inválido para exclusão');
  });
});
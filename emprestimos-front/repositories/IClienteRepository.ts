import { Cliente } from "@/types";

export interface IClienteRepository {
  obterTodos(): Promise<Cliente[]>;
  obterPorId(id: number): Promise<Cliente | null>;
  criar(cliente: Cliente): Promise<Cliente>;
  atualizar(id: number, cliente: Cliente): Promise<Cliente>;
  excluir(id: number): Promise<void>;
}
import { ResultadoAnalise } from '@/types';

export interface DadosAnalise {
  nome: string;
  idade: number;
  renda: number;
  estado: string;
}

export interface IEmprestimoRepository {
  analisarEmprestimo(dados: DadosAnalise): Promise<ResultadoAnalise>;
}
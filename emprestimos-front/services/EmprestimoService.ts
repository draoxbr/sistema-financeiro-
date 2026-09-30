import { IEmprestimoRepository, DadosAnalise } from '@/repositories/IEmprestimoRepository';
import { ResultadoAnalise } from '@/types';

export class EmprestimoService {
  constructor(private emprestimoRepository: IEmprestimoRepository) {}

  async analisarEmprestimo(dados: DadosAnalise): Promise<ResultadoAnalise> {
    if (dados.renda <= 0) {
      throw new Error('A renda informada deve ser maior que zero.');
    }
    return await this.emprestimoRepository.analisarEmprestimo(dados);
  }
}
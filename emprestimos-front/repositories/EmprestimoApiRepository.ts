import { IEmprestimoRepository, DadosAnalise } from './IEmprestimoRepository';
import { ResultadoAnalise } from '@/types';

export class EmprestimoApiRepository implements IEmprestimoRepository {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  async analisarEmprestimo(dados: DadosAnalise): Promise<ResultadoAnalise> {
    const response = await fetch(`${this.baseUrl}/clientes-loans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error(`Erro na API (${response.status}): Falha ao realizar análise de crédito.`);
    }

    return await response.json();
  }
}
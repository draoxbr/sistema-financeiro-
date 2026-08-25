export interface Cliente {
    id?:    number;
    nome:   string;
    cpf:    string;
    idade:  number;
    renda:  number;
    estado: string;
}

export interface Emprestimo {
    tipo: string;
    taxa_juros: number;

}

export interface ResultadoAnalise {
    cliente: string;
    emprestimos: Emprestimo[]
}
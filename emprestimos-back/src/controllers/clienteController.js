const ClienteService = require('../services/clienteService');

const criar = async (req, res) => {
  try {
    const { nome, cpf, idade, renda, estado } = req.body;
    if (!nome || !cpf || idade === undefined || renda === undefined || !estado) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const novoCliente = await ClienteService.criarCliente(req.body);
    return res.status(201).json(novoCliente);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const listarTodos = async (req, res) => {
  try {
    const clientes = await ClienteService.getAllClientes();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPorId = async (req, res) => {
  try {
    const cliente = await ClienteService.getClientePorId(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const atualizado = await ClienteService.updateCliente(req.params.id, req.body);
    if (!atualizado) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    return res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const excluir = async (req, res) => {
  try {
    const excluido = await ClienteService.excluirCliente(req.params.id);
    if (!excluido) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    return res.status(200).json({ message: 'Cliente removido com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const analiseEmprestimo = async (req, res) => {
  try {
    const { nome, idade, renda, estado } = req.body;
    if (idade === undefined || renda === undefined || !estado) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes para análise.' });
    }

    const emprestimosDisponiveis = ClienteService.evaluateLoans(req.body);

    return res.status(200).json({
      cliente: nome || 'Cliente',
      emprestimos: emprestimosDisponiveis
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criar,
  listarTodos,
  getPorId,
  update,
  excluir,
  analiseEmprestimo
};
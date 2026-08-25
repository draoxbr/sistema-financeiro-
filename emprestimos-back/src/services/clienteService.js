const db = require('../database/db');


const evaluateLoans = (dadosCliente) => {
  const { idade, renda, estado } = dadosCliente;
  const emprestimos = [];

  if (renda <= 3000 || (renda > 3000 && renda <= 5000 && idade < 30 && estado.toUpperCase() === 'SP')) {
    emprestimos.push({ tipo: 'PERSONAL', taxa_juros: 4 });
  }

  if (renda <= 3000 || (renda > 3000 && renda <= 5000 && idade < 30 && estado.toUpperCase() === 'SP')) {
    emprestimos.push({ tipo: 'GUARANTEED', taxa_juros: 3 });
  }

  if (renda >= 5000) {
    emprestimos.push({ tipo: 'CONSIGNMENT', taxa_juros: 2 });
  }

  return emprestimos;
};

const criarCliente = async (dados) => {
  const { nome, cpf, idade, renda, estado } = dados;
  const [resultado] = await db.query(
    'INSERT INTO clientes (nome, cpf, idade, renda, estado) VALUES (?, ?, ?, ?, ?)',
    [nome, cpf, idade, renda, estado]
  ); console.log(nome)
  return { id: resultado.insertId, ...dados };
};

const getAllClientes = async () => {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
};

const getClientePorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

const updateCliente = async (id, dados) => {
  const { nome, cpf, idade, renda, estado } = dados;
  const [resultado] = await db.query(
    'UPDATE clientes SET nome = ?, cpf = ?, idade = ?, renda = ?, estado = ? WHERE id = ?',
    [nome, cpf, idade, renda, estado, id]
  );
  return resultado.affectedRows > 0;
};

const excluirCliente = async (id) => {
  const [resultado] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
};

module.exports = {
  evaluateLoans,
  criarCliente,
  getAllClientes,
  getClientePorId,
  updateCliente,
  excluirCliente
};
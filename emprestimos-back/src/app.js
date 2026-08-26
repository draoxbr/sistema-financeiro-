const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./database/db');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

app.post('/auth/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const hashSenha = await bcrypt.hash(senha, 10);
        await pool.execute(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashSenha]
        );
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário ou e-mail já existente.' });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        
        const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao realizar login' });
    }
});

app.use(clienteRoutes);

module.exports = app;
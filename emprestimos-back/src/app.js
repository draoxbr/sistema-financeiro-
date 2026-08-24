const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
app.use(cors());

app.use(express.json());
app.use(clienteRoutes);

module.exports = app;
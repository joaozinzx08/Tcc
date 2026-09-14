const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// 1. Importação das rotas
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// 2. Registro das rotas na aplicação
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/announcements', announcementRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'Resolva Já API rodando 🚀' });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao SQLite com sucesso.');

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao conectar no banco:', err);
  }
}

start();
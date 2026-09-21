const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminRoutes = require('./routes/adminRoutes')


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.json({
    status: 'Resolva Já API rodando 🚀',
  });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();

    console.log('✅ Conectado ao SQLite com sucesso.');

    // Cria tabelas que não existirem.
    // NÃO usamos alter:true porque no SQLite isso pode
    // gerar problemas com tabelas *_backup.
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(
        `Servidor rodando em http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.error(
      '❌ Erro ao iniciar o servidor:',
      err
    );
  }
}

start();
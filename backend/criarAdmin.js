require('dotenv').config();

const bcrypt = require('bcrypt');
const { sequelize, Employee } = require('./src/models');

async function criarAdmin() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const matricula = '0001';

    const existente = await Employee.findOne({
      where: { matricula },
    });

    if (existente) {
      console.log('⚠️ Já existe um usuário com a matrícula 0001.');
      return;
    }

    const senha_hash = await bcrypt.hash('123456', 10);

    const admin = await Employee.create({
      matricula: '0001',
      senha_hash,
      nome: 'Joao Teste',
      setor: 'TI',
      cargo: 'Administrador',
      status: 'ativo',
      role: 'admin',
    });

    console.log('✅ Admin criado com sucesso!');
    console.log('Matrícula:', admin.matricula);
    console.log('Senha: 123456');
    console.log('Role:', admin.role);
  } catch (err) {
    console.error('❌ Erro ao criar admin:', err);
  } finally {
    await sequelize.close();
  }
}

criarAdmin();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models');

// Login do colaborador
async function login(req, res) {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({
      erro: 'Matrícula e senha são obrigatórias.',
    });
  }

  try {
    const employee = await Employee.findOne({
      where: {
        matricula: String(matricula).trim(),
      },
    });

    if (!employee) {
      return res.status(401).json({
        erro: 'Matrícula ou senha inválidas.',
      });
    }

    if (employee.status === 'inativo') {
      return res.status(403).json({
        erro: 'Seu acesso está inativo. Procure o RH.',
      });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      employee.senha_hash
    );

    if (!senhaValida) {
      return res.status(401).json({
        erro: 'Matrícula ou senha inválidas.',
      });
    }

    const token = jwt.sign(
      {
        id: employee.id,
        matricula: employee.matricula,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h',
      }
    );

    res.json({
      token,

      colaborador: {
        id: employee.id,
        nome: employee.nome,
        matricula: employee.matricula,
        setor: employee.setor,
        cargo: employee.cargo,
        foto_url: employee.foto_url,
        email: employee.email,
        telefone: employee.telefone,
        status: employee.status,
        data_admissao: employee.data_admissao,
        role: employee.role,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: 'Erro ao fazer login.',
    });
  }
}

// Criar colaborador - somente admin/RH
async function createEmployee(req, res) {
  const {
    matricula,
    senha,
    nome,
    setor,
    cargo,
    email,
    telefone,
    status,
    data_admissao,
    role,
  } = req.body;

  if (!matricula || !senha || !nome) {
    return res.status(400).json({
      erro: 'Matrícula, senha e nome são obrigatórios.',
    });
  }

  if (String(senha).length < 6) {
    return res.status(400).json({
      erro: 'A senha deve possuir pelo menos 6 caracteres.',
    });
  }

  try {
    const matriculaLimpa = String(matricula).trim();

    const existente = await Employee.findOne({
      where: {
        matricula: matriculaLimpa,
      },
    });

    if (existente) {
      return res.status(409).json({
        erro: 'Já existe um colaborador com essa matrícula.',
      });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const employee = await Employee.create({
      matricula: matriculaLimpa,
      senha_hash,
      nome: String(nome).trim(),
      setor: setor?.trim() || null,
      cargo: cargo?.trim() || null,
      email: email?.trim() || null,
      telefone: telefone?.trim() || null,
      status: status || 'ativo',
      data_admissao: data_admissao || null,
      role: role || 'colaborador',
    });

    res.status(201).json({
      id: employee.id,
      nome: employee.nome,
      matricula: employee.matricula,
      setor: employee.setor,
      cargo: employee.cargo,
      email: employee.email,
      telefone: employee.telefone,
      status: employee.status,
      data_admissao: employee.data_admissao,
      role: employee.role,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: 'Erro ao criar colaborador.',
    });
  }
}

// LISTAR COLABORADORES - era isso que estava faltando
async function listEmployees(req, res) {
  try {
    const employees = await Employee.findAll({
      attributes: {
        exclude: ['senha_hash'],
      },

      order: [['nome', 'ASC']],
    });

    res.json(employees);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: 'Erro ao listar colaboradores.',
    });
  }
}

// Ver os próprios dados
async function getMe(req, res) {
  try {
    const employee = await Employee.findByPk(
      req.employee.id,
      {
        attributes: {
          exclude: ['senha_hash'],
        },
      }
    );

    if (!employee) {
      return res.status(404).json({
        erro: 'Colaborador não encontrado.',
      });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: 'Erro ao buscar perfil.',
    });
  }
}

// Editar os próprios dados
async function updateMe(req, res) {
  const {
    email,
    telefone,
    foto_url,
  } = req.body;

  try {
    const employee = await Employee.findByPk(
      req.employee.id
    );

    if (!employee) {
      return res.status(404).json({
        erro: 'Colaborador não encontrado.',
      });
    }

    await employee.update({
      email: email ?? employee.email,
      telefone: telefone ?? employee.telefone,
      foto_url: foto_url ?? employee.foto_url,
    });

    const {
      senha_hash,
      ...dadosPublicos
    } = employee.toJSON();

    res.json(dadosPublicos);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: 'Erro ao atualizar perfil.',
    });
  }
}

module.exports = {
  login,
  createEmployee,
  listEmployees,
  getMe,
  updateMe,
};
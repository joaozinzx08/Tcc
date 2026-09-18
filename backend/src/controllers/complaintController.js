const { Complaint, ComplaintResponse, Employee } = require('../models');

// Gera um protocolo tipo RJ-2026-000123
function gerarProtocolo() {
  const ano = new Date().getFullYear();
  const numero = Math.floor(100000 + Math.random() * 900000);
  return `RJ-${ano}-${numero}`;
}

// Criar nova reclamação
async function createComplaint(req, res) {
  const { titulo, descricao, categoria, setor_relacionado, anonima } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ erro: 'Título e descrição são obrigatórios.' });
  }

  try {
    const complaint = await Complaint.create({
      titulo,
      descricao,
      categoria,
      setor_relacionado,
      anonima: anonima || false,
      protocolo: gerarProtocolo(),
      employee_id: req.employee.id, // vem do token, via authMiddleware
      status: 'pendente',
    });

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar reclamação.' });
  }
}

// Listar reclamações do colaborador logado
async function listMyComplaints(req, res) {
  try {
    const complaints = await Complaint.findAll({
      where: { employee_id: req.employee.id },
      include: [{ model: ComplaintResponse, include: [Employee] }],
      order: [['createdAt', 'DESC']],
    });

    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar reclamações.' });
  }
}

// Ver detalhe de uma reclamação (com timeline de respostas)
async function getComplaint(req, res) {
  try {
    const complaint = await Complaint.findByPk(req.params.id, {
      include: [{ model: ComplaintResponse, include: [Employee] }],
    });

    if (!complaint) {
      return res.status(404).json({ erro: 'Reclamação não encontrada.' });
    }

    // colaborador comum só pode ver a própria reclamação; admin vê todas
    if (req.employee.role !== 'admin' && complaint.employee_id !== req.employee.id) {
      return res.status(403).json({ erro: 'Sem permissão para ver esta reclamação.' });
    }

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar reclamação.' });
  }
}

// Atualizar status (uso do admin/RH)
async function updateStatus(req, res) {
  const { status } = req.body;
  const statusValidos = ['pendente', 'em_analise', 'respondida', 'resolvida', 'nao_resolvida'];

  if (!statusValidos.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido.' });
  }

  try {
    const complaint = await Complaint.findByPk(req.params.id);

    if (!complaint) {
      return res.status(404).json({ erro: 'Reclamação não encontrada.' });
    }

    complaint.status = status;
    await complaint.save();

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar status.' });
  }
}

// Adicionar uma resposta/interação na timeline
async function addResponse(req, res) {
  const { mensagem } = req.body;

  if (!mensagem) {
    return res.status(400).json({ erro: 'Mensagem é obrigatória.' });
  }

  try {
    const complaint = await Complaint.findByPk(req.params.id);

    if (!complaint) {
      return res.status(404).json({ erro: 'Reclamação não encontrada.' });
    }

    const response = await ComplaintResponse.create({
      mensagem,
      complaint_id: complaint.id,
      autor_id: req.employee.id,
    });

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao adicionar resposta.' });
  }
}

module.exports = {
  createComplaint,
  listMyComplaints,
  getComplaint,
  updateStatus,
  addResponse,
};
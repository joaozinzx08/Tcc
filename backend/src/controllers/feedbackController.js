const { Feedback, Complaint } = require('../models');

// Criar feedback (qualquer um dos 3 tipos)
async function createFeedback(req, res) {
  const { tipo, nota, comentario, complaint_id } = req.body;

  const tiposValidos = ['avaliacao_reclamacao', 'sugestao_empresa', 'avaliacao_sistema'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ erro: 'Tipo de feedback inválido.' });
  }

  if (tipo === 'avaliacao_reclamacao') {
    if (!complaint_id) {
      return res.status(400).json({ erro: 'complaint_id é obrigatório para avaliar uma reclamação.' });
    }

    const complaint = await Complaint.findByPk(complaint_id);
    if (!complaint) {
      return res.status(404).json({ erro: 'Reclamação não encontrada.' });
    }
    if (complaint.employee_id !== req.employee.id) {
      return res.status(403).json({ erro: 'Você só pode avaliar suas próprias reclamações.' });
    }
    if (!['resolvida', 'nao_resolvida'].includes(complaint.status)) {
      return res.status(400).json({ erro: 'Só é possível avaliar reclamações já finalizadas.' });
    }
  }

  if (!nota && !comentario) {
    return res.status(400).json({ erro: 'Informe uma nota ou um comentário.' });
  }

  try {
    const feedback = await Feedback.create({
      tipo,
      nota: nota || null,
      comentario: comentario || null,
      complaint_id: tipo === 'avaliacao_reclamacao' ? complaint_id : null,
      employee_id: req.employee.id,
    });

    res.status(201).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar feedback.' });
  }
}

// Listar feedbacks do próprio colaborador
async function listMyFeedbacks(req, res) {
  try {
    const feedbacks = await Feedback.findAll({
      where: { employee_id: req.employee.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar feedbacks.' });
  }
}

// Listar reclamações do colaborador que já podem ser avaliadas (resolvidas/não resolvidas e ainda sem feedback)
async function listAvaliaveis(req, res) {
  try {
    const complaints = await Complaint.findAll({
      where: { employee_id: req.employee.id },
      include: [{ model: Feedback, required: false }],
    });

    const avaliaveis = complaints.filter(
      (c) => ['resolvida', 'nao_resolvida'].includes(c.status) && !c.Feedback
    );

    res.json(avaliaveis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar reclamações avaliáveis.' });
  }
}

module.exports = { createFeedback, listMyFeedbacks, listAvaliaveis };
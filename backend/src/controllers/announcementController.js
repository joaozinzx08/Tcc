const { Announcement, Employee } = require('../models');

// Listar avisos (qualquer colaborador logado)
async function listAnnouncements(req, res) {
  try {
    const announcements = await Announcement.findAll({
      include: [{ model: Employee, attributes: ['id', 'nome'] }],
      order: [
        ['fixado', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });

    res.json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar avisos.' });
  }
}

// Ver um aviso específico
async function getAnnouncement(req, res) {
  try {
    const announcement = await Announcement.findByPk(req.params.id, {
      include: [{ model: Employee, attributes: ['id', 'nome'] }],
    });

    if (!announcement) {
      return res.status(404).json({ erro: 'Aviso não encontrado.' });
    }

    res.json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar aviso.' });
  }
}

// Criar aviso (só admin)
async function createAnnouncement(req, res) {
  if (req.employee.role !== 'admin') {
    return res.status(403).json({ erro: 'Apenas administradores podem criar avisos.' });
  }

  const { titulo, conteudo, categoria, fixado } = req.body;

  if (!titulo || !conteudo) {
    return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios.' });
  }

  try {
    const announcement = await Announcement.create({
      titulo,
      conteudo,
      categoria,
      fixado: fixado || false,
      autor_id: req.employee.id,
    });

    res.status(201).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar aviso.' });
  }
}

// Editar aviso (só admin)
async function updateAnnouncement(req, res) {
  if (req.employee.role !== 'admin') {
    return res.status(403).json({ erro: 'Apenas administradores podem editar avisos.' });
  }

  try {
    const announcement = await Announcement.findByPk(req.params.id);

    if (!announcement) {
      return res.status(404).json({ erro: 'Aviso não encontrado.' });
    }

    const { titulo, conteudo, categoria, fixado } = req.body;

    await announcement.update({
      titulo: titulo ?? announcement.titulo,
      conteudo: conteudo ?? announcement.conteudo,
      categoria: categoria ?? announcement.categoria,
      fixado: fixado ?? announcement.fixado,
    });

    res.json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao editar aviso.' });
  }
}

// Apagar aviso (só admin)
async function deleteAnnouncement(req, res) {
  if (req.employee.role !== 'admin') {
    return res.status(403).json({ erro: 'Apenas administradores podem apagar avisos.' });
  }

  try {
    const announcement = await Announcement.findByPk(req.params.id);

    if (!announcement) {
      return res.status(404).json({ erro: 'Aviso não encontrado.' });
    }

    await announcement.destroy();
    res.json({ mensagem: 'Aviso apagado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao apagar aviso.' });
  }
}

module.exports = {
  listAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
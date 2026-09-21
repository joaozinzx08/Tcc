const { Op, fn, col } = require('sequelize')
const { Complaint, Employee } = require('../models')

async function getDashboard(req, res) {
  try {
    const seteDiasAtras = new Date()
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7)

    const [
      totalReclamacoes,
      reclamacoesUltimos7Dias,
      totalColaboradores,
      colaboradoresAtivos,
      statusRows,
      reclamacoesRecentes,
    ] = await Promise.all([
      Complaint.count(),

      Complaint.count({
        where: {
          createdAt: {
            [Op.gte]: seteDiasAtras,
          },
        },
      }),

      Employee.count({
        where: {
          role: 'colaborador',
        },
      }),

      Employee.count({
        where: {
          role: 'colaborador',
          status: 'ativo',
        },
      }),

      Complaint.findAll({
        attributes: [
          'status',
          [fn('COUNT', col('id')), 'total'],
        ],
        group: ['status'],
        raw: true,
      }),

      Complaint.findAll({
        attributes: [
          'id',
          'protocolo',
          'titulo',
          'categoria',
          'setor_relacionado',
          'status',
          'createdAt',
        ],
        order: [['createdAt', 'DESC']],
        limit: 5,
        raw: true,
      }),
    ])

    const porStatus = statusRows.map((item) => ({
      status: item.status,
      total: Number(item.total),
    }))

    return res.json({
      resumo: {
        totalReclamacoes,
        reclamacoesUltimos7Dias,
        totalColaboradores,
        colaboradoresAtivos,
      },

      porStatus,

      reclamacoesRecentes,
    })
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)

    return res.status(500).json({
      erro: 'Erro ao carregar dashboard administrativo.',
    })
  }
}

module.exports = {
  getDashboard,
}
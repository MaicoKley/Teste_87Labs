import Sequelize, { Op } from 'sequelize';
import Balance from '../models/Balance';
import Transaction from '../models/Transaction';

class BalanceController {
  async index(req, res) {
    const { id } = req.body;

    const { value } = await Balance.findOne({ where: { user_id: id } });

    return res.json(value);
  }

  async update(req, res) {
    const { id, value } = req.body;

    const balance = await Balance.findOne({ where: { user_id: id } });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const total = await Transaction.findAll({
      attributes: [
        'user_from',
        [Sequelize.fn('sum', Sequelize.col('value')), 'totalValue'],
      ],
      group: ['Transaction.user_from'],
      raw: true,
      where: {
        user_from: id,
        type: 'D',
        createdAt: { [Op.between]: [startOfDay, endOfDay] },
      },
    });

    if (
      total[0].totalValue &&
      (parseFloat(total[0].totalValue) >= 800 ||
        parseFloat(total[0].totalValue) + value >= 800)
    ) {
      return res.status(400).json({ error: 'Deposit only R$ 800,00 per day.' });
    }

    if (value > 800) {
      return res.status(400).json({ error: 'Deposit higher than R$ 800,00.' });
    }

    const transaction = await Transaction.create({
      user_from: id,
      value,
      type: 'D',
    });

    await balance.update({ value: value + parseFloat(balance.value) });

    return res.json({ balance, total, transaction });
  }
}

export default new BalanceController();

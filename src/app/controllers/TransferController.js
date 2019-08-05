import { Op } from 'sequelize';
import User from '../models/User';
import Balance from '../models/Balance';
import Transaction from '../models/Transaction';

class TransferController {
  async index(req, res) {
    const { id } = req.body;

    const transaction = await Transaction.findAll({
      where: {
        user_from: id,
        createdAt: { [Op.gte]: Date.now() - 604800000 },
      },
    });

    return res.json(transaction);
  }

  async store(req, res) {
    const { user_from, value, user_to } = req.body;

    const sender = await User.findByPk(user_from);

    const receiver = await User.findByPk(user_to);

    if (!receiver) {
      return res.status(401).json({ error: 'Receiver not found' });
    }

    if (sender.limit < value) {
      return res.status(401).json({ error: 'Transaction over the limit' });
    }

    const balance = await Balance.findOne({ where: { user_id: user_to } });

    const transaction = await Transaction.create({
      user_from,
      value,
      user_to,
      type: 'T',
    });

    await balance.update({ value: value + parseFloat(balance.value) });

    return res.json({ balance, transaction });
  }
}

export default new TransferController();

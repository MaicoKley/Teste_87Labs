import { Op } from 'sequelize';
import User from '../models/User';
import Balance from '../models/Balance';
import Transaction from '../models/Transaction';

class TransferController {
  async index(req, res) {
    const id = req.userId;
    const { days } = req.body;

    const time = days ? days * 86400000 : 604800000;

    const transaction = await Transaction.findAll({
      where: {
        user_from: id,
        createdAt: { [Op.gte]: Date.now() - time },
      },
    });

    return res.json(transaction);
  }

  async store(req, res) {
    const user_from = req.userId;
    const { value, user_to } = req.body;

    const sender = await User.findByPk(user_from);

    const receiver = await User.findByPk(user_to);

    if (!receiver) {
      return res.status(401).json({ error: 'Receiver not found' });
    }

    if (sender.limit < value) {
      return res.status(403).json({ error: 'Transaction over the limit' });
    }

    const balanceSender = await Balance.findOne({
      where: { user_id: user_from },
    });

    if (balanceSender.value < value) {
      return res.status(403).json({ error: 'Balance is not enough.' });
    }

    await balanceSender.update({
      value: parseFloat(balanceSender.value) - value,
    });

    const balanceReceiver = await Balance.findOne({
      where: { user_id: user_to },
    });

    const transaction = await Transaction.create({
      user_from,
      value,
      user_to,
      type: 'T',
    });

    await balanceReceiver.update({
      value: value + parseFloat(balanceReceiver.value),
    });

    return res.json({ balanceReceiver, transaction });
  }
}

export default new TransferController();

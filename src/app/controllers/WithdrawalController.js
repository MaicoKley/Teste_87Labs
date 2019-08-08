import noteCounter from '../functions/NoteCounter';
import Withdrawal from '../models/Withdrawal';
import Balance from '../models/Balance';

class WithdrawalController {
  async index(req, res) {
    const { id, value } = req.body;

    if (value % 5 !== 0) {
      return res.status(400).json({ error: 'Minimun banknote is R$ 5,00.' });
    }

    const balance = await Balance.findOne({
      where: { user_id: id },
    });

    if (balance.value < value) {
      return res.status(403).json({ error: 'Balance is not enough.' });
    }

    await noteCounter(id, value);

    const withdrawal = await Withdrawal.findAll({
      where: {
        user_id: id,
      },
      attributes: ['id', 'hundred', 'fifty', 'twenty', 'ten', 'five'],
    });

    return res.json(withdrawal);
  }

  async update(req, res) {
    const { id } = req.body;

    const withdrawal = await Withdrawal.findOne({
      where: {
        id,
      },
    });

    const balance = await Balance.findOne({
      where: { user_id: withdrawal.user_id },
    });

    await balance.update({
      value: parseFloat(balance.value) - withdrawal.value,
    });

    await Withdrawal.destroy({
      where: { user_id: withdrawal.user_id },
    });

    return res.json(balance);
  }
}

export default new WithdrawalController();

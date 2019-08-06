import noteCounter from '../functions/NoteCounter';
import Withdrawal from '../models/Withdrawal';

class WithdrawalController {
  async index(req, res) {
    const { id, value } = req.body;

    if (value % 5 !== 0) {
      return res.status(400).json({ error: 'Minimun banknote is R$ 5,00.' });
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
}

export default new WithdrawalController();

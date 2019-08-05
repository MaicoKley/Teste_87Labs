/* eslint-disable no-restricted-syntax */

/* Não finalizado */
function noteCounter(value, banknotes) {
  let returnKey = '';
  for (const note of banknotes) {
    const quantity = Math.floor(value / note);
    console.log(`${quantity} notas de ${note}`);
    /* if (value % note === 0) {
      break;
    } */
    returnKey = returnKey + note.toString() + quantity.toString();
    value -= quantity * note;
  }
  return returnKey;
}

class WithdrawalController {
  async index(req, res) {
    const { id, value } = req.body;

    const banknotes = [100, 50, 20, 10, 5];

    if (value % Math.min(...banknotes) !== 0) {
      return res.status(400).json({ error: 'Minimun banknote is R$ 5,00.' });
    }

    const text = noteCounter(value, banknotes);

    return res.json({ text });
  }
}

export default new WithdrawalController();

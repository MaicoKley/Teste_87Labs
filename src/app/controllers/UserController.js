import User from '../models/User';
import Balance from '../models/Balance';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { cpf: req.body.cpf } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const user = await User.create(req.body);

    const limit = Math.floor(Math.random() * (+1800 - +1200) + +1200);
    let account = Math.floor(Math.random() * +99999).toString();
    let agency = Math.floor(Math.random() * +9999).toString();

    if (account.length < 5) {
      account = '0'.repeat(5 - account.length) + account;
    }

    if (agency.length < 4) {
      agency = '0'.repeat(4 - agency.length) + agency;
    }

    await user.update({ limit, account, agency });

    await Balance.create({ user_id: user.id });

    return res.json({
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      adress: user.adress,
      birth_date: user.birth_date,
      gender: user.gender,
      limit: user.limit,
      account: user.account,
      agency: user.agency,
    });
  }

  async update(req, res) {
    const { id, newLimit } = req.body;

    const user = await User.findByPk(id);

    if (Date.now() - user.updatedAt.getTime() < 600000) {
      return res
        .status(403)
        .json({ error: 'Wait 10 minutes until next limit update.' });
    }

    await user.update({ limit: newLimit });

    return res.json(user);
  }
}

export default new UserController();

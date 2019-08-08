import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { cpf, password } = req.body;

    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        cpf,
      },
      token: jwt.sign({ id }, '62fbc8e2b1362f9afcef5379803ae042', {
        expiresIn: '1d',
      }),
    });
  }
}

export default new SessionController();

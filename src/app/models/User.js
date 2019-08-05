import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        adress: Sequelize.STRING,
        birth_date: Sequelize.DATE,
        gender: Sequelize.STRING,
        // password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        limit: Sequelize.DECIMAL,
        account: Sequelize.STRING,
        agency: Sequelize.STRING,
        // updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;

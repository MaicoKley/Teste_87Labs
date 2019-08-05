import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        user_from: Sequelize.INTEGER,
        value: Sequelize.DECIMAL,
        user_to: Sequelize.INTEGER,
        type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Transaction;

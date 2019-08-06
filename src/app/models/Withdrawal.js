import Sequelize, { Model } from 'sequelize';

class Withdrawal extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        value: Sequelize.DECIMAL,
        hundred: Sequelize.INTEGER,
        fifty: Sequelize.INTEGER,
        twenty: Sequelize.INTEGER,
        ten: Sequelize.INTEGER,
        five: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Withdrawal;

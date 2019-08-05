import Sequelize, { Model } from 'sequelize';

class Balance extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        value: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
  }
}

export default Balance;

import Sequelize from 'sequelize';

import User from '../app/models/User';
import Balance from '../app/models/Balance';
import Transaction from '../app/models/Transaction';

import databaseConfig from '../config/database';

const models = [User, Balance, Transaction];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();

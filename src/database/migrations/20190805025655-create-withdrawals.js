module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('withdrawals', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        unique: false,
      },
      value: {
        type: Sequelize.DECIMAL(11, 2),
        defaultValue: 0,
        allowNull: false,
      },
      hundred: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      fifty: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      twenty: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      ten: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      five: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('withdrawals');
  },
};

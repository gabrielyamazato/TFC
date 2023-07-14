import { Model, QueryInterface, DataTypes } from 'sequelize';
import Teams from '../../Interfaces/Teams';

export default {
  async up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Teams>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        field: 'team_name',
      },
    });
  },

  async down (queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  }
};

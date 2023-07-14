import { Model, QueryInterface, DataTypes } from 'sequelize';
import Users from '../../Interfaces/Users';

export default {
  async up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Users>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { 
        type: DataTypes.STRING,
      },
      role: { 
        type: DataTypes.STRING,
      },
      email: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface: QueryInterface) {
   return queryInterface.dropTable('users');
  }
};

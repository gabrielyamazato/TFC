import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

export default class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
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
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

import * as bcrypt from 'bcryptjs'
import Login from '../Interfaces/Login';
import userModel from '../database/models/Users.model';
import JwtUtils from '../utils/jwtUtils';

export default class authLogin {
  private jwtUtils = new JwtUtils();

  private model = userModel;

  public async authLogin(data: Login): Promise<string | object> {
    const { email, password } = data;

    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return 'USER_DOES_NOT_EXIST';
    }

    if (!bcrypt.compareSync(password, user.dataValues.password)) {
      return 'INVALID'
    }

    const token = this.jwtUtils.sign({ id: user.dataValues.id });

    return { token: token }
  }

  public async getRole(data: string): Promise<object | string> {
    const tokenToValidate = data.split(' ');

    const tokenValidated = this.jwtUtils.decode(tokenToValidate[1]);

    const user = await this.model.findByPk(tokenValidated.id);

    if (!user) {
      return 'INVALID_TOKEN'
    }
    
    return {
      role: user.dataValues.role
    }
  }
}

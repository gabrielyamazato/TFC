import Login from '../Interfaces/Login';
import userModel from '../database/models/Users.model';

export default class authLogin {
  private model = userModel;

  public async authLogin(data: Login) {
    const { email } = data;

    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    console.log(user.dataValues.email);
    return user.dataValues.email;
  }
}

import Login from '../Interfaces/Login';
import userModel from '../database/models/Users.model';

async function checkLogin(data: Login): Promise<any> {
  const { email } = data;
  const reqUser = await userModel.findOne({ where: { email } });

  return reqUser;
}

export default checkLogin;

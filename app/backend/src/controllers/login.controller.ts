import { Request, Response } from 'express';
import LoginService from '../services/login.services';

export default class authLogin {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.loginService.authLogin(req.body);

    if (serviceResponse === 'USER_DOES_NOT_EXIST' || serviceResponse === 'INVALID') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json(serviceResponse);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const roleService = await this.loginService.getRole(authorization);

    if (roleService === 'INVALID_TOKEN') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return res.status(200).json(roleService);
  }
}

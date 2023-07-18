import { Request, Response } from 'express';
import loginService from '../services/login.services';

export default class authLogin {
  constructor(
    private LoginService = new loginService(),
  ) { }

  public async login(req: Request, res: Response) {
    const serviceResponse = await this.LoginService.authLogin(req.body);
    console.log('CONSOLE 2 AQUI ----->', serviceResponse);
    res.status(200).json(serviceResponse);
  }
}

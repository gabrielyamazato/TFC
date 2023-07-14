import { Request, Response } from "express";
import loginService from '../services/login.services';

async function checkLogin(req: Request, res: Response): Promise<Response> {
  const resp = await loginService(req.body);

  return res.status(200).json({ message: 'ok', user: resp });
};

export default checkLogin;
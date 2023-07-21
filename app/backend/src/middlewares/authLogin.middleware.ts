import { NextFunction, Request, Response } from 'express';
import Login from '../Interfaces/Login';
import IsValidEmail from '../validations/Email';

export default class authLoginMiddleware {
  static validateFieldsLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as Login;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!IsValidEmail.isValidEmail(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

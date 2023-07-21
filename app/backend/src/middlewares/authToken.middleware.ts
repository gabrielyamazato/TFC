import { NextFunction, Request, Response } from 'express';
import JwtUtils from '../utils/jwtUtils';

export default class authTokenMiddleware {
  static jwtUtils = new JwtUtils();

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ');

    try {
      authTokenMiddleware.jwtUtils.verify(token[1]);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}

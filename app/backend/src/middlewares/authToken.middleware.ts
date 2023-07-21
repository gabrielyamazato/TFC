import { NextFunction, Request, Response } from 'express';
import JwtUtils from '../utils/jwtUtils';

export default class authTokenMiddleware {
  private jwtUtils = new JwtUtils();

  public validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ "message": "Token not found" })
    }

    const token = authorization.split(' ');

    const tokenValidated = this.jwtUtils.verify(token[1]);

    if (!tokenValidated) {
      return res.status(401).json({ "message": "Token must be a valid token" })
    }

    next();
  }
}
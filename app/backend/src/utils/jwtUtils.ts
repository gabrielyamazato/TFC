import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces/Identify';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'YOU_SHALL_NOT_PASS';

  public sign(payload: Identifiable): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  public verify(payload: string): any {
    return jwt.verify(payload, this.jwtSecret);
  }

  static decode(payload: string): any {
    return jwt.decode(payload);
  }
}

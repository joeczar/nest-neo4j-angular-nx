import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload, JwtValidateResponse } from '../types/auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  /**
   * Validates the payload of a JWT token.
   * @param payload - The payload of the JWT token.
   * @returns A promise that resolves to a `JwtValidateResponse` object.
   */
  async validate(payload: JwtPayload): Promise<JwtValidateResponse> {
    // Payload validation logic here
    return { id: payload.sub, username: payload.email };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWTSECRET,
    });
  }
  async validate(payload: any) {
    if (payload.exp < payload.iat)
      throw new HttpException('Token Expired', HttpStatus.UNAUTHORIZED);
    if (!(await this.authService.validateUserExists(payload.user_id)))
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    return payload;
  }
}

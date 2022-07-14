import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WEB_TOKEN_PROVIDE_NAME } from '../../token/core/web-token-factory';
import { TokenService } from '../../token/core/token.service';
import { UserDTO } from '../models/users/user.dto.model';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  @Inject(WEB_TOKEN_PROVIDE_NAME)
  private readonly tokenService: TokenService<UserDTO, JwtPayload | string>;

  async canActivate(
      context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      throw new HttpException({}, 403);
    } else {
      try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = await this.tokenService.decodeToken(token);
        req.token = token;
        req.user = decoded;
        return true;
      } catch (e) {
        throw new HttpException({status: 401, error: 'Unauthorized'}, 401);
      }
    }
  }
}

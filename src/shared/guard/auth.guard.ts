import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WEB_TOKEN_PROVIDE_NAME } from '../token/web-token-factory';
import { TokenService } from '../token/token.service';
import { UserDTO } from '../models/users/user.dto.model';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  @Inject(WEB_TOKEN_PROVIDE_NAME)
  private readonly tokenService: TokenService<UserDTO, JwtPayload | string>;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      return false;
    } else {
      const token = req.headers.authorization.replace('Bearer ', '');
      const decoded = this.tokenService.decodeToken(token);
      req.token = token;
      req.user = decoded;
    }
    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserTypes } from '../enums';

@Injectable()
export class BuyerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest({ user }) {
    if (!user) return false;
    if (user.userType === UserTypes.BUYER) {
      return true;
    }
    return false;
  }
}

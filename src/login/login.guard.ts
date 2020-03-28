import { Injectable, ExecutionContext, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { Reflector } from "@nestjs/core";

@Injectable()
export class CustomGuart extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, _info, context) { 
    const { params } = context.getRequest();
    const id = params && params.id;
    const roles = this.reflector.get(
      'roles', context.getHandler()
    );

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (!roles) {
      return user;
    }

    if (roles.role >= user.role) {
      return user;
    }

    if (roles.selfManager && user.id === id) {
      return user;
    }

    throw new ForbiddenException();
  }
}
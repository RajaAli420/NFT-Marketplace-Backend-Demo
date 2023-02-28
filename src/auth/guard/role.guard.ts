import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private refelector: Reflector,
    private primsaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.refelector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    if (req.user) {
      const { user_id } = req.user;
      console.log(req.user);
      const user = await this.primsaService.user.findUnique({
        where: {
          user_id: user_id,
        },
        select: {
          Role: {
            select: {
              type: true,
            },
          },
        },
      });
      console.log(roles.includes(user.Role.type), user.Role.type);
      return roles.includes(user.Role.type);
    }

    console.log('roles', roles);
    return false;
  }
}

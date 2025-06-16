import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roleAttendu = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );

    const requete = context.switchToHttp().getRequest();
    const utilisateur = requete['utilisateur'];

    if (!roleAttendu) return true;

    if (!utilisateur || utilisateur.role !== roleAttendu) {
      throw new ForbiddenException('Accès réservé');
    }

    return true;
  }
}

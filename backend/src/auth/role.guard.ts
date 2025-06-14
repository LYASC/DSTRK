import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roleAttendu = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );
    if (!roleAttendu) return true; // Aucun rôle requis => accès libre

    const requete = context.switchToHttp().getRequest();
    const utilisateur = requete.utilisateur;

    if (utilisateur?.role !== roleAttendu) {
      throw new ForbiddenException('Accès réservé');
    }

    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requete = context.switchToHttp().getRequest<Request>();
    const authorization = requete.headers['authorization'];

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou mal formé');
    }

    const token = authorization.split(' ')[1];

    try {
      const utilisateur = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      requete['utilisateur'] = utilisateur; // ✅ Pour l’utiliser ensuite dans les contrôleurs
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}

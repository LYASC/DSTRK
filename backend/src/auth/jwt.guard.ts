import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requete = context.switchToHttp().getRequest<Request>();
    const authorization = requete.headers['authorization'];

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false;
    }

    const token = authorization.split(' ')[1];

    try {
      const utilisateur = await this.jwtService.verifyAsync(token);
      requete['utilisateur'] = utilisateur;
      return true;
    } catch (err) {
      return false;
    }
  }
}

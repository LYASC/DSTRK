import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';

@Controller('utilisateurs')
export class UsersController {
  constructor(private readonly serviceUtilisateurs: UsersService) {}

  @Post('inscription')
  inscrire(
    @Body() donnees: { nom: string; email: string; motDePasse: string },
  ) {
    return this.serviceUtilisateurs.inscription(donnees);
  }

  @Post('connexion')
  connecter(@Body() donnees: { email: string; motDePasse: string }) {
    return this.serviceUtilisateurs.connexion(donnees);
  }

  @UseGuards(JwtGuard)
  @Get('mon-profil')
  obtenirProfil(@Req() requete) {
    return {
      message: 'Voici votre profil',
      utilisateur: requete.utilisateur,
    };
  }

  // Route protégée par JWT + rôle
  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Get('admin-seulement')
  routeAdmin(@Req() requete) {
    return {
      message: 'Bienvenue administrateur',
      utilisateur: requete.utilisateur,
    };
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('client')
  @Get('test-client')
  testClient(@Req() req) {
    return {
      message: 'Bienvenue client',
      utilisateur: req.utilisateur,
    };
  }
}

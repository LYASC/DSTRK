import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';
import { Utilisateur } from './user.entity';

@Controller('utilisateurs')
export class UsersController {
  constructor(private readonly serviceUtilisateurs: UsersService) {}

  @Post('inscription')
  inscrire(
    @Body()
    donnees: {
      prenom: string;
      nom: string;
      email: string;
      motDePasse: string;
    },
  ) {
    return this.serviceUtilisateurs.inscription(donnees);
  }

  @Post('connexion')
  connecter(@Body() donnees: { email: string; motDePasse: string }) {
    return this.serviceUtilisateurs.connexion(donnees);
  }

  @UseGuards(JwtGuard)
  @Get('mon-profil')
  async obtenirProfil(@Req() requete) {
    const utilisateurComplet = await this.serviceUtilisateurs.trouverParId(
      requete.utilisateur.id,
    );
    return {
      message: 'Voici votre profil',
      utilisateur: utilisateurComplet,
    };
  }

  @UseGuards(JwtGuard)
  @Patch('mon-profil')
  modifierProfil(@Req() requete, @Body() donnees: Partial<Utilisateur>) {
    const utilisateur = requete.utilisateur;
    return this.serviceUtilisateurs.mettreAJourProfil(utilisateur.id, donnees);
  }

  @UseGuards(JwtGuard)
  @Delete('mon-compte')
  supprimerMonCompte(@Req() requete) {
    const utilisateur = requete.utilisateur;
    return this.serviceUtilisateurs.supprimerCompte(utilisateur.id);
  }

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

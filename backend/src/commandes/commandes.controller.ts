import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { JwtGuard } from '../auth/jwt.guard';
import { Role } from '../auth/role.decorator';
import { RoleGuard } from '../auth/role.guard';

@Controller('commandes')
export class CommandesController {
  constructor(private readonly serviceCommandes: CommandesService) {}

  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  @Role('client') //Uniquement les clients peuvent commander
  creerCommande(
    @Body()
    donnees: { produits: { produitId: number; quantite: number }[] },
    @Req() requete,
  ) {
    return this.serviceCommandes.creerCommande(
      donnees.produits,
      requete.utilisateur,
    );
  }
}

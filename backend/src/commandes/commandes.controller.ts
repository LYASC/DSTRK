import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';

@Controller('commandes')
export class CommandesController {
  constructor(private readonly serviceCommandes: CommandesService) {}

  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  @Role('client')
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

  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Get()
  getToutesLesCommandes() {
    return this.serviceCommandes.listerToutesLesCommandes();
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('client')
  @Get('mes-commandes')
  getMesCommandes(@Req() requete) {
    return this.serviceCommandes.listerCommandesDuClient(
      requete.utilisateur.id,
    );
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Patch(':id/statut')
  changerStatutCommande(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { statut: string },
  ) {
    return this.serviceCommandes.mettreAJourStatut(id, body.statut);
  }
}

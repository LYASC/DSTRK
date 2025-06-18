import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly serviceCollections: CollectionsService) {}

  //Seuls les admins peuvent créer une collection
  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Post()
  creer(@Body() donnees: { nom: string; imageUrl?: string }) {
    return this.serviceCollections.creerCollection(
      donnees.nom,
      donnees.imageUrl,
    );
  }

  //Accessible à tous
  @Get()
  lister() {
    return this.serviceCollections.listerCollections();
  }

  //Accessible à tous
  @Get(':id')
  afficher(@Param('id') id: string) {
    return this.serviceCollections.trouverParId(+id);
  }

  //Suppression réservée aux admins
  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Delete(':id')
  supprimer(@Param('id') id: string) {
    return this.serviceCollections.supprimer(+id);
  }

  //Pour voir le nombre de votes par collection (admin)
  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Get(':id/votes')
  getVotesPourCollection(@Param('id') id: number) {
    return this.serviceCollections.getNombreVotesParCollection(id);
  }
}

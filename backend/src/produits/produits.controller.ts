import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly serviceProduits: ProduitsService) {}

  @Get()
  getTousLesProduits() {
    return this.serviceProduits.listerProduitsActifs();
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Post()
  creerProduit(@Body() donnees: any) {
    return this.serviceProduits.creerProduit(donnees);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Put(':id')
  modifierProduit(@Param('id', ParseIntPipe) id: number, @Body() donnees: any) {
    return this.serviceProduits.modifierProduit(id, donnees);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Role('admin')
  @Delete(':id')
  supprimerProduit(@Param('id', ParseIntPipe) id: number) {
    return this.serviceProduits.supprimerProduit(id);
  }
}

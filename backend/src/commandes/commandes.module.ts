import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './commande.entity';
import { CommandeProduit } from './commande-produit.entity';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Commande, CommandeProduit])],
  controllers: [CommandesController],
  providers: [CommandesService],
  exports: [CommandesService],
})
export class CommandesModule {}

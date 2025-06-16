import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './commande.entity';
import { CommandeProduit } from './commande-produit.entity';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { Produit } from '../produits/produit.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande, CommandeProduit, Produit]),
    UsersModule,
  ],
  controllers: [CommandesController],
  providers: [CommandesService],
  exports: [CommandesService],
})
export class CommandesModule {}

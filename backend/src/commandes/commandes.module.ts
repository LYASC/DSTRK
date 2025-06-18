import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './commande.entity';
import { CommandeProduit } from './commande-produit.entity';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { Produit } from '../produits/produit.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande, CommandeProduit, Produit]),
    UsersModule,
    AuthModule,
  ],
  controllers: [CommandesController],
  providers: [CommandesService],
  exports: [CommandesService],
})
export class CommandesModule {}

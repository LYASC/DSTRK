import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './commande.entity';
import { CommandeProduit } from './commande-produit.entity';
import { Produit } from '../produits/produit.entity';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande, CommandeProduit, Produit]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  controllers: [CommandesController],
  providers: [CommandesService],
})
export class CommandesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './produit.entity';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Produit]), JwtModule],
  controllers: [ProduitsController],
  providers: [ProduitsService],
})
export class ProduitsModule {}

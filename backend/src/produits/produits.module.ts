import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './produit.entity';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produit])],
  controllers: [ProduitsController],
  providers: [ProduitsService],
})
export class ProduitsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './produit.entity';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { RoleGuard } from '../auth/role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produit]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [ProduitsController],
  providers: [ProduitsService, Reflector, RoleGuard],
})
export class ProduitsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { AuthModule } from '../auth/auth.module'; //Ajout important

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection]),
    AuthModule, //Ajouté ici pour permettre l’accès à JwtGuard et JwtService
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}

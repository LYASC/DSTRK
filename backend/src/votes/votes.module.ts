import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { Collection } from '../collections/collection.entity';
import { Utilisateur } from '../users/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote, Collection, Utilisateur]),
    AuthModule,
  ],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}

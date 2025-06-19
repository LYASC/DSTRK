import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentaire } from './commentaire.entity';
import { CommentairesService } from './commentaires.service';
import { CommentairesController } from './commentaires.controller';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commentaire, Post]), AuthModule],
  providers: [CommentairesService],
  controllers: [CommentairesController],
})
export class CommentairesModule {}

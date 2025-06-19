import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';
import { Utilisateur } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Utilisateur]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

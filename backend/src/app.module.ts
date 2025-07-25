import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProduitsModule } from './produits/produits.module';
import { CommandesModule } from './commandes/commandes.module';
import { CollectionsModule } from './collections/collections.module';
import { VotesModule } from './votes/votes.module';
import { PostsModule } from './posts/posts.module';
import { CommentairesModule } from './commentaires/commentaires.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ProduitsModule,
    CommandesModule,
    CollectionsModule,
    VotesModule,
    PostsModule,
    CommentairesModule,
    PostsModule,
    CommentairesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

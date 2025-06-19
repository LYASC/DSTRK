import {
  Controller,
  Post as PostMethod,
  Get,
  Body,
  Req,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtGuard)
  @PostMethod()
  creer(@Req() req, @Body() body: { texte?: string; imageUrl?: string }) {
    return this.postsService.creerPost(
      req.utilisateur.id,
      body.texte,
      body.imageUrl,
    );
  }

  @Get()
  lister() {
    return this.postsService.listerPosts();
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  supprimer(@Req() req, @Param('id') id: number) {
    return this.postsService.supprimerPost(id, req.utilisateur.id);
  }
}

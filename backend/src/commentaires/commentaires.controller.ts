import {
  Controller,
  Post,
  Delete,
  Patch,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentairesService } from './commentaires.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('commentaires')
export class CommentairesController {
  constructor(private readonly commentairesService: CommentairesService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  async ajouterCommentaire(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: { contenu: string; parentId?: number },
    @Req() req,
  ) {
    return this.commentairesService.creerCommentaire(
      req.utilisateur.id,
      postId,
      body.contenu,
      body.parentId, // utilisé si c'est une réponse
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async supprimerCommentaire(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.commentairesService.supprimerCommentaire(
      id,
      req.utilisateur.id,
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async modifierCommentaire(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { contenu: string },
    @Req() req,
  ) {
    return this.commentairesService.modifierCommentaire(
      id,
      req.utilisateur.id,
      body.contenu,
    );
  }

  @Get('post/:postId')
  async getCommentairesParPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentairesService.getCommentairesParPost(postId);
  }
}

import {
  Controller,
  Post as PostMethod,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  Get,
  Patch,
} from '@nestjs/common';
import { CommentairesService } from './commentaires.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('commentaires')
export class CommentairesController {
  constructor(private readonly commentairesService: CommentairesService) {}

  @UseGuards(JwtGuard)
  @PostMethod(':postId')
  commenter(
    @Param('postId') postId: number,
    @Req() req,
    @Body() body: { contenu: string; parentId?: number }, // 👈 parentId facultatif
  ) {
    return this.commentairesService.creerCommentaire(
      req.utilisateur.id,
      postId,
      body.contenu,
      body.parentId,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  supprimer(@Req() req, @Param('id') id: number) {
    return this.commentairesService.supprimerCommentaire(
      id,
      req.utilisateur.id,
    );
  }

  @Get('post/:postId')
  getCommentairesParPost(@Param('postId') postId: number) {
    return this.commentairesService.getCommentairesParPost(postId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  modifier(
    @Req() req,
    @Param('id') id: number,
    @Body() body: { contenu: string },
  ) {
    return this.commentairesService.modifierCommentaire(
      id,
      req.utilisateur.id,
      body.contenu,
    );
  }
}

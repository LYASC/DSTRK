import {
  Controller,
  Post as PostMethod,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
  Delete,
  Param,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostsService } from './posts.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Créer un post avec image téléversée
  @UseGuards(JwtGuard)
  @PostMethod()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const name = `post-${Date.now()}${ext}`;
          cb(null, name);
        },
      }),
    }),
  )
  async creer(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Body() body: any,
  ) {
    const imageUrl = file ? `/uploads/posts/${file.filename}` : undefined;

    if (!body || (body.texte?.trim() === '' && !imageUrl)) {
      throw new BadRequestException(
        'Le post doit contenir un texte ou une image.',
      );
    }

    return this.postsService.creerPost(
      req.utilisateur.id,
      body.texte,
      imageUrl,
    );
  }

  // Liste des posts
  @Get()
  lister() {
    return this.postsService.listerPosts();
  }

  // Détail d’un post par ID (utilisé pour vérifier l’auteur dans CommentairesPost.vue)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.postsService.getById(+id);
  }

  // Supprimer un post
  @UseGuards(JwtGuard)
  @Delete(':id')
  supprimer(@Req() req, @Param('id') id: number) {
    return this.postsService.supprimerPost(+id, req.utilisateur.id);
  }

  // Modifier un post avec nouvelle image possible
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const name = `post-${Date.now()}${ext}`;
          cb(null, name);
        },
      }),
    }),
  )
  modifier(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Param('id') id: number,
    @Body() body: { texte?: string },
  ) {
    const imageUrl = file ? `/uploads/posts/${file.filename}` : undefined;
    return this.postsService.modifierPost(
      +id,
      req.utilisateur.id,
      body.texte,
      imageUrl,
    );
  }
}

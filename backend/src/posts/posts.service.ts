import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async creerPost(utilisateurId: number, texte?: string, imageUrl?: string) {
    const post = this.postRepo.create({
      texte,
      imageUrl,
      utilisateur: { id: utilisateurId },
    });
    return this.postRepo.save(post);
  }

  async listerPosts() {
    return this.postRepo.find({
      relations: ['utilisateur', 'commentaires', 'commentaires.utilisateur'],
      order: {
        id: 'DESC',
        commentaires: {
          date: 'ASC',
        },
      },
    });
  }

  async supprimerPost(postId: number, utilisateurId: number) {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['utilisateur'],
    });
    if (!post) throw new NotFoundException('Post introuvable');
    if (post.utilisateur.id !== utilisateurId)
      throw new ForbiddenException('Action non autorisée');
    return this.postRepo.remove(post);
  }

  async modifierPost(
    postId: number,
    utilisateurId: number,
    texte?: string,
    imageUrl?: string,
  ) {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['utilisateur'],
    });

    if (!post) throw new NotFoundException('Post introuvable');
    if (post.utilisateur.id !== utilisateurId)
      throw new ForbiddenException('Action non autorisée');

    if (texte !== undefined) post.texte = texte;
    if (imageUrl !== undefined) post.imageUrl = imageUrl;

    return this.postRepo.save(post);
  }
}

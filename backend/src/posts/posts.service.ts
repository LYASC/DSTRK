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

  // ✅ Créer un post
  async creerPost(utilisateurId: number, texte?: string, imageUrl?: string) {
    const post = this.postRepo.create({
      texte,
      imageUrl,
      utilisateur: { id: utilisateurId },
    });
    return this.postRepo.save(post);
  }

  // ✅ Liste des posts
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

  // ✅ Détail d’un post
  async getById(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['utilisateur'],
    });
    if (!post) throw new NotFoundException('Post introuvable');
    return post;
  }

  // ✅ Supprimer un post
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

  // ✅ Modifier un post
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

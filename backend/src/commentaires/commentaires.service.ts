import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commentaire } from './commentaire.entity';
import { Repository, IsNull } from 'typeorm';

@Injectable()
export class CommentairesService {
  constructor(
    @InjectRepository(Commentaire)
    private commentaireRepo: Repository<Commentaire>,
  ) {}

  async creerCommentaire(
    utilisateurId: number,
    postId: number,
    contenu: string,
    parentId?: number,
  ) {
    if (!contenu || contenu.trim() === '') {
      throw new BadRequestException('Le contenu ne peut pas être vide');
    }

    const data: any = {
      contenu,
      post: { id: postId },
      utilisateur: { id: utilisateurId },
    };

    if (parentId !== undefined) {
      data.parent = { id: parentId };
    }

    const commentaire = this.commentaireRepo.create(data);
    return this.commentaireRepo.save(commentaire);
  }
  async getCommentairesParPost(postId: number) {
    return this.commentaireRepo.find({
      where: {
        post: { id: postId },
        parent: IsNull(),
      },
      relations: ['utilisateur', 'reponses', 'reponses.utilisateur'],
      order: {
        date: 'ASC',
        reponses: {
          date: 'ASC',
        },
      },
    });
  }

  async supprimerCommentaire(commentaireId: number, utilisateurId: number) {
    const com = await this.commentaireRepo.findOne({
      where: { id: commentaireId },
      relations: ['utilisateur', 'post', 'post.utilisateur'],
    });

    if (!com) throw new NotFoundException('Commentaire introuvable');

    if (
      com.utilisateur.id !== utilisateurId &&
      com.post.utilisateur.id !== utilisateurId
    ) {
      throw new ForbiddenException('Action non autorisée');
    }

    return this.commentaireRepo.remove(com);
  }
  async modifierCommentaire(
    commentaireId: number,
    utilisateurId: number,
    nouveauContenu: string,
  ) {
    if (!nouveauContenu || nouveauContenu.trim() === '') {
      throw new BadRequestException('Le contenu ne peut pas être vide');
    }

    const commentaire = await this.commentaireRepo.findOne({
      where: { id: commentaireId },
      relations: ['utilisateur'],
    });

    if (!commentaire) {
      throw new NotFoundException('Commentaire introuvable');
    }

    if (commentaire.utilisateur.id !== utilisateurId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres commentaires',
      );
    }

    commentaire.contenu = nouveauContenu;
    commentaire.modifie = true;
    commentaire.dateModification = new Date();

    return this.commentaireRepo.save(commentaire);
  }
}

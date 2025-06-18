import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Repository } from 'typeorm';
import { Collection } from '../collections/collection.entity';
import { Utilisateur } from '../users/user.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepo: Repository<Vote>,

    @InjectRepository(Collection)
    private collectionRepo: Repository<Collection>,

    @InjectRepository(Utilisateur)
    private utilisateurRepo: Repository<Utilisateur>,
  ) {}

  async voter(
    utilisateurId: number,
    collectionId: number,
    valeur: number,
  ): Promise<{ message: string }> {
    const collection = await this.collectionRepo.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException('Collection non trouvée');
    }

    // Vérifier si l'utilisateur a déjà voté pour cette collection
    const voteExistant = await this.voteRepo.findOne({
      where: {
        utilisateur: { id: utilisateurId },
        collection: { id: collectionId },
      },
    });

    if (voteExistant) {
      throw new BadRequestException(
        'Vous avez déjà voté pour cette collection.',
      );
    }

    const vote = this.voteRepo.create({
      utilisateur: { id: utilisateurId },
      collection,
      valeur,
    });

    await this.voteRepo.save(vote);

    return { message: 'Vote enregistré avec succès' };
  }

  async getVotesPourCollection(collectionId: number): Promise<Vote[]> {
    return this.voteRepo.find({
      where: { collection: { id: collectionId } },
      relations: ['utilisateur'],
    });
  }
}

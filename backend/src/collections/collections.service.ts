import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private repoCollections: Repository<Collection>,
  ) {}

  creerCollection(nom: string, imageUrl?: string) {
    const collection = this.repoCollections.create({ nom, imageUrl });
    return this.repoCollections.save(collection);
  }

  listerCollections() {
    return this.repoCollections.find({ relations: ['votes'] });
  }

  async trouverParId(id: number) {
    const collection = await this.repoCollections.findOne({
      where: { id },
      relations: ['votes'],
    });
    if (!collection) throw new NotFoundException('Collection non trouvée');
    return collection;
  }

  async supprimer(id: number) {
    const collection = await this.trouverParId(id);
    return this.repoCollections.remove(collection);
  }

  async getNombreVotesParCollection(id: number) {
    const collection = await this.repoCollections.findOne({
      where: { id },
      relations: ['votes'],
    });

    if (!collection) {
      throw new NotFoundException('Collection non trouvée');
    }

    return {
      collectionId: collection.id,
      nom: collection.nom,
      nombreDeVotes: collection.votes.length,
    };
  }
}

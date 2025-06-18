import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Utilisateur } from '../users/user.entity';
import { Collection } from '../collections/collection.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Utilisateur, { eager: true })
  utilisateur: Utilisateur;

  @ManyToOne(() => Collection, (collection) => collection.votes)
  collection: Collection;

  @Column()
  valeur: number; // 1 ou 2
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Commande } from '../commandes/commande.entity';
import { Post } from '../posts/post.entity';
import { Commentaire } from '../commentaires/commentaire.entity';

export enum Role {
  CLIENT = 'client',
  ADMIN = 'admin',
}

export enum Genre {
  FEMME = 'femme',
  HOMME = 'homme',
  AUTRE = 'autre',
}

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  prenom: string; // ➕ nouveau champ

  @Column({ length: 100 })
  nom: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 20, nullable: true })
  telephone: string;

  @Column({ length: 255 })
  @Exclude()
  motDePasse: string;

  @Column({ type: 'enum', enum: Role, default: Role.CLIENT })
  role: Role;

  @Column({ type: 'enum', enum: Genre, nullable: true })
  genre: Genre;

  @Column({ length: 255, nullable: true })
  rue: string;

  @Column({ length: 100, nullable: true })
  province: string;

  @Column({ length: 10, nullable: true })
  codePostal: string;

  @Column({ length: 100, nullable: true })
  ville: string;

  @Column({ default: 0 })
  pointsFidelite: number;

  @CreateDateColumn()
  creeLe: Date;

  @UpdateDateColumn()
  misAJourLe: Date;

  @OneToMany(() => Commande, (commande) => commande.utilisateur)
  commandes: Commande[];

  @OneToMany(() => Post, (post) => post.utilisateur)
  posts: Post[];

  @OneToMany(() => Commentaire, (commentaire) => commentaire.utilisateur)
  commentaires: Commentaire[];
}

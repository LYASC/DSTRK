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

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  @Exclude() //Cache le mot de passe dans les réponses frontend
  motDePasse: string;

  @Column({ type: 'enum', enum: Role, default: Role.CLIENT })
  role: Role;

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

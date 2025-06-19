import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from '../users/user.entity';
import { Commentaire } from '../commentaires/commentaire.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  texte: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.posts)
  utilisateur: Utilisateur;

  @OneToMany(() => Commentaire, (commentaire) => commentaire.post, {
    cascade: true,
  })
  commentaires: Commentaire[];
}

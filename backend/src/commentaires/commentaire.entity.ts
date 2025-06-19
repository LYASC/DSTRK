import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity()
export class Commentaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contenu: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.commentaires)
  utilisateur: Utilisateur;

  @ManyToOne(() => Post, (post) => post.commentaires)
  post: Post;

  @ManyToOne(() => Commentaire, (commentaire) => commentaire.reponses, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: Commentaire;

  @OneToMany(() => Commentaire, (commentaire) => commentaire.parent, {
    cascade: true,
  })
  reponses: Commentaire[];

  @Column({ default: false })
  modifie: boolean;

  @Column({ type: 'timestamp', nullable: true })
  dateModification: Date;
}

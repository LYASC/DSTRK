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

  @Column('text')
  contenu: string;

  @CreateDateColumn()
  date: Date;

  @Column({ default: false })
  modifie: boolean;

  @Column({ type: 'timestamp', nullable: true })
  dateModification: Date;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.commentaires, {
    onDelete: 'CASCADE',
  })
  utilisateur: Utilisateur;

  @ManyToOne(() => Post, (post) => post.commentaires, {
    onDelete: 'CASCADE',
  })
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
}

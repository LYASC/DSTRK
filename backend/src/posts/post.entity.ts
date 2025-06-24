import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from '../users/user.entity'; // ✔️ Corrigé pour cohérence
import { Commentaire } from '../commentaires/commentaire.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true }) // ✔️ Pour les textes plus longs
  texte: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.posts, {
    onDelete: 'CASCADE', // ✔️ Supprime les posts si l'utilisateur est supprimé
  })
  utilisateur: Utilisateur;

  @OneToMany(() => Commentaire, (commentaire) => commentaire.post, {
    cascade: true, // ✔️ Supprime les commentaires si le post est supprimé
  })
  commentaires: Commentaire[];
}

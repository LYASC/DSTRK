import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CommandeProduit } from './commande-produit.entity';
import { Utilisateur } from '../users/user.entity';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.commandes)
  utilisateur: Utilisateur; //Qui a passé la commande

  @OneToMany(() => CommandeProduit, (cp) => cp.commande)
  commandeProduits: CommandeProduit[];

  @CreateDateColumn()
  date: Date; // Date d’achat

  @Column('decimal', { precision: 10, scale: 2 })
  total: number; // Montant total

  @Column({ default: 'en_attente' }) // autres valeurs possibles : "expédiée", "livrée"
  statut: string;
}

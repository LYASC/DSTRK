import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Commande } from '../commandes/commande.entity';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  motDePasse: string;

  @Column({ default: 'client' })
  role: string; // 'client' ou 'admin'

  @Column({ default: 0 })
  pointsFidelite: number;

  @OneToMany(() => Commande, (commande) => commande.utilisateur)
  commandes: Commande[]; //liste des commandes de l’utilisateur
}

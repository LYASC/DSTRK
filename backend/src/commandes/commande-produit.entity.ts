import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Produit } from '../produits/produit.entity';
import { Commande } from './commande.entity';

@Entity()
export class CommandeProduit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Commande, (commande) => commande.commandeProduits)
  commande: Commande;

  @ManyToOne(() => Produit)
  produit: Produit;

  @Column()
  quantite: number;

  @Column('decimal', { precision: 10, scale: 2 })
  sousTotal: number;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Commande } from './commande.entity';
import { Produit } from '../produits/produit.entity';

@Entity()
export class CommandeProduit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Commande, (commande) => commande.commandeProduits, {
    onDelete: 'CASCADE',
  })
  commande: Commande;

  @ManyToOne(() => Produit, { eager: true })
  produit: Produit;

  @Column()
  quantite: number;
}

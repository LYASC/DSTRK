import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number; // Identifiant unique du produit

  @Column()
  nom: string; // Nom du produit (ex : T-shirt noir)

  @Column('text')
  description: string; // Description détaillée

  @Column('decimal', { precision: 10, scale: 2 })
  prix: number; // Prix en euros (ex : 29.99)

  @Column()
  image: string; // URL de l’image (à afficher dans la boutique)

  @Column()
  stock: number; // Quantité disponible en stock

  @Column({ default: true })
  actif: boolean; // Permet d'activer/désactiver l'affichage du produit
}

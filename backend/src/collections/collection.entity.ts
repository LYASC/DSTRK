import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from '../votes/vote.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string; // Nom de la collection (ex : Été 2025)

  @Column({ nullable: true })
  imageUrl: string; // Image facultative pour représenter la collection

  @OneToMany(() => Vote, (vote) => vote.collection)
  votes: Vote[]; // Tous les votes liés à cette collection
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

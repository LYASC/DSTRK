import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from './commande.entity';
import { Repository } from 'typeorm';
import { Produit } from '../produits/produit.entity';
import { CommandeProduit } from './commande-produit.entity';
import { Utilisateur } from '../users/user.entity';

@Injectable()
export class CommandesService {
  constructor(
    @InjectRepository(Commande)
    private repoCommandes: Repository<Commande>,

    @InjectRepository(CommandeProduit)
    private repoCommandeProduit: Repository<CommandeProduit>,

    @InjectRepository(Produit)
    private repoProduits: Repository<Produit>,
  ) {}

  async creerCommande(
    produits: { produitId: number; quantite: number }[],
    utilisateur: Utilisateur,
  ) {
    let total = 0;
    const items: CommandeProduit[] = [];

    for (const p of produits) {
      const produit = await this.repoProduits.findOne({
        where: { id: p.produitId },
      });
      if (!produit) {
        throw new NotFoundException(`Produit ID ${p.produitId} non trouvé`);
      }

      const ligne = this.repoCommandeProduit.create({
        produit,
        quantite: p.quantite,
        sousTotal: produit.prix * p.quantite,
      });

      total += ligne.sousTotal;
      items.push(ligne);
    }

    const commande = this.repoCommandes.create({
      utilisateur,
      total,
      statut: 'en_attente',
      commandeProduits: items,
    });

    await this.repoCommandes.save(commande);
    await this.repoCommandeProduit.save(items);

    return {
      message: 'Commande enregistrée avec succès',
      commandeId: commande.id,
      total,
    };
  }
}

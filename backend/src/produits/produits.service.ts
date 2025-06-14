import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from './produit.entity';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit)
    private readonly depotProduits: Repository<Produit>,
  ) {}

  async listerProduitsActifs() {
    return this.depotProduits.find({ where: { actif: true } });
  }

  async afficherProduit(id: number) {
    const produit = await this.depotProduits.findOne({ where: { id } });
    if (!produit) throw new NotFoundException('Produit introuvable');
    return produit;
  }

  async creerProduit(donnees: any) {
    const nouveau = this.depotProduits.create(donnees);
    return this.depotProduits.save(nouveau);
  }

  async modifierProduit(id: number, donnees: any) {
    const produit = await this.afficherProduit(id);
    Object.assign(produit, donnees);
    return this.depotProduits.save(produit);
  }

  async supprimerProduit(id: number) {
    const produit = await this.afficherProduit(id);
    return this.depotProduits.remove(produit);
  }
}

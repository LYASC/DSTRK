import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Utilisateur)
    private depotUtilisateurs: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}

  async inscription(donnees: {
    nom: string;
    email: string;
    motDePasse: string;
  }) {
    const utilisateurExistant = await this.depotUtilisateurs.findOne({
      where: { email: donnees.email },
    });

    if (utilisateurExistant) {
      throw new Error('Email déjà utilisé');
    }

    const motDePasseChiffre = await bcrypt.hash(donnees.motDePasse, 10);

    const nouvelUtilisateur = this.depotUtilisateurs.create({
      nom: donnees.nom,
      email: donnees.email,
      motDePasse: motDePasseChiffre,
    });

    await this.depotUtilisateurs.save(nouvelUtilisateur);
    return { message: 'Inscription réussie' };
  }

  async connexion(donnees: { email: string; motDePasse: string }) {
    const utilisateur = await this.depotUtilisateurs.findOne({
      where: { email: donnees.email },
    });

    if (!utilisateur) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const motDePasseValide = await bcrypt.compare(
      donnees.motDePasse,
      utilisateur.motDePasse,
    );

    if (!motDePasseValide) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const donneesDuJeton = {
      id: utilisateur.id,
      email: utilisateur.email,
      role: utilisateur.role,
    };

    const jeton = this.jwtService.sign(donneesDuJeton);

    return {
      message: 'Connexion réussie',
      jeton,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    };
  }
}

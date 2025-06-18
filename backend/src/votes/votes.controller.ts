import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';

@Controller('votes')
export class VotesController {
  constructor(private readonly serviceVotes: VotesService) {}

  @UseGuards(JwtGuard, RoleGuard)
  @Role('client')
  @Post(':collectionId')
  voter(
    @Param('collectionId') collectionId: number,
    @Body() body: { valeur: number },
    @Req() requete,
  ) {
    return this.serviceVotes.voter(
      requete.utilisateur.id,
      collectionId,
      body.valeur,
    );
  }

  @Get(':collectionId')
  getVotes(@Param('collectionId') collectionId: number) {
    return this.serviceVotes.getVotesPourCollection(collectionId);
  }
}

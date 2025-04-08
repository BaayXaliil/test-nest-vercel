import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EtablissementsService } from './etablissements.service';
import { CreateEtablissementDto } from './dto/create-etablissement.dto';
import { UpdateEtablissementDto } from './dto/update-etablissement.dto';

@ApiTags('Établissements')
@Controller('etablissements')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class EtablissementsController {
  constructor(private readonly etablissementsService: EtablissementsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel établissement' })
  create(@Body() createEtablissementDto: CreateEtablissementDto) {
    return this.etablissementsService.create(createEtablissementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les établissements' })
  findAll() {
    return this.etablissementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un établissement par son ID' })
  findOne(@Param('id') id: string) {
    return this.etablissementsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un établissement' })
  update(
    @Param('id') id: string,
    @Body() updateEtablissementDto: UpdateEtablissementDto,
  ) {
    return this.etablissementsService.update(id, updateEtablissementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un établissement' })
  remove(@Param('id') id: string) {
    return this.etablissementsService.remove(id);
  }
}
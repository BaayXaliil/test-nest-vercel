import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Services')
@Controller('services')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ETABLISSEMENT)
  @ApiOperation({ summary: 'Créer un nouveau service' })
  @ApiResponse({ status: 201, description: 'Service créé avec succès' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les services' })
  @ApiResponse({ status: 200, description: 'Liste des services récupérée' })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get('etablissement/:id')
  @ApiOperation({ summary: 'Récupérer les services d\'un établissement' })
  @ApiResponse({ status: 200, description: 'Services de l\'établissement récupérés' })
  findByEtablissement(@Param('id') id: string) {
    return this.servicesService.findByEtablissement(id);
  }

  @Get('categorie/:categorie')
  @ApiOperation({ summary: 'Récupérer les services par catégorie' })
  @ApiResponse({ status: 200, description: 'Services de la catégorie récupérés' })
  findByCategorie(@Param('categorie') categorie: string) {
    return this.servicesService.findByCategorie(categorie);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un service par son ID' })
  @ApiResponse({ status: 200, description: 'Service récupéré' })
  @ApiResponse({ status: 404, description: 'Service non trouvé' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.ETABLISSEMENT)
  @ApiOperation({ summary: 'Mettre à jour un service' })
  @ApiResponse({ status: 200, description: 'Service mis à jour' })
  @ApiResponse({ status: 404, description: 'Service non trouvé' })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Patch(':id/disponibilite')
  @Roles(Role.ADMIN, Role.ETABLISSEMENT)
  @ApiOperation({ summary: 'Mettre à jour la disponibilité d\'un service' })
  @ApiResponse({ status: 200, description: 'Disponibilité mise à jour' })
  updateDisponibilite(
    @Param('id') id: string,
    @Body('disponible') disponible: boolean,
  ) {
    return this.servicesService.updateDisponibilite(id, disponible);
  }

  @Patch(':id/prix')
  @Roles(Role.ADMIN, Role.ETABLISSEMENT)
  @ApiOperation({ summary: 'Mettre à jour le prix d\'un service' })
  @ApiResponse({ status: 200, description: 'Prix mis à jour' })
  updatePrix(@Param('id') id: string, @Body('prix') prix: number) {
    return this.servicesService.updatePrix(id, prix);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ETABLISSEMENT)
  @ApiOperation({ summary: 'Supprimer un service' })
  @ApiResponse({ status: 200, description: 'Service supprimé' })
  @ApiResponse({ status: 404, description: 'Service non trouvé' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
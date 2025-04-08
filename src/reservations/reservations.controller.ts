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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@ApiTags('Réservations')
@Controller('reservations')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle réservation' })
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les réservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Récupérer les réservations d\'un client' })
  findByClient(@Param('clientId') clientId: string) {
    return this.reservationsService.findByClient(clientId);
  }

  @Get('etablissement/:etablissementId')
  @ApiOperation({ summary: 'Récupérer les réservations d\'un établissement' })
  findByEtablissement(@Param('etablissementId') etablissementId: string) {
    return this.reservationsService.findByEtablissement(etablissementId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une réservation par son ID' })
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une réservation' })
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une réservation' })
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Créer une nouvelle notification' })
  @ApiResponse({ status: 201, description: 'Notification créée avec succès' })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les notifications' })
  @ApiResponse({ status: 200, description: 'Liste des notifications récupérée' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('destinataire/:id')
  @ApiOperation({ summary: 'Récupérer les notifications d\'un destinataire' })
  @ApiResponse({ status: 200, description: 'Notifications du destinataire récupérées' })
  findByDestinataire(@Param('id') id: string) {
    return this.notificationsService.findByDestinataire(id);
  }

  @Get('destinataire/:id/unread-count')
  @ApiOperation({ summary: 'Récupérer le nombre de notifications non lues' })
  @ApiResponse({ status: 200, description: 'Nombre de notifications non lues récupéré' })
  getUnreadCount(@Param('id') id: string) {
    return this.notificationsService.getUnreadCount(id);
  }

  @Patch(':id/mark-as-read')
  @ApiOperation({ summary: 'Marquer une notification comme lue' })
  @ApiResponse({ status: 200, description: 'Notification marquée comme lue' })
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archiver une notification' })
  @ApiResponse({ status: 200, description: 'Notification archivée' })
  archive(@Param('id') id: string) {
    return this.notificationsService.archive(id);
  }
}
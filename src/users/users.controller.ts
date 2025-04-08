import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Utilisateurs')
@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  async create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('role/:role')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Récupérer les utilisateurs par rôle' })
  @ApiResponse({ status: 200, description: 'Utilisateurs récupérés par rôle' })
  async findByRole(@Param('role') role: string) {
    return this.usersService.findByRole(role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/preferences')
  @ApiOperation({ summary: 'Mettre à jour les préférences d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Préférences mises à jour' })
  async updatePreferences(
    @Param('id') id: string,
    @Body() preferences: Record<string, any>,
  ) {
    return this.usersService.updatePreferences(id, preferences);
  }

  @Patch(':id/change-password')
  @ApiOperation({ summary: 'Changer le mot de passe d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Mot de passe changé avec succès' })
  @ApiResponse({ status: 400, description: 'Ancien mot de passe incorrect' })
  async changePassword(
    @Param('id') id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    const success = await this.usersService.changePassword(id, oldPassword, newPassword);
    if (!success) {
      throw new HttpException('Ancien mot de passe incorrect', HttpStatus.BAD_REQUEST);
    }
    return { message: 'Mot de passe changé avec succès' };
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: 'Utilisateur supprimé avec succès' };
  }
}
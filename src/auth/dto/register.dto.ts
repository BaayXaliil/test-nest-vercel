import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class RegisterDto {
  @ApiProperty({ description: 'Nom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: 'Prénom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Rôle de l\'utilisateur', enum: Role })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @ApiProperty({ description: 'Numéro de téléphone', required: false })
  @IsString()
  telephone?: string;
}
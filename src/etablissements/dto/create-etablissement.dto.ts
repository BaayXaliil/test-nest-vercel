import { IsString, IsNotEmpty, IsOptional, IsObject, IsBoolean, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEtablissementDto {
  @ApiProperty({ description: 'Nom de l\'établissement' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: 'Type d\'établissement (hôtel, restaurant, etc.)' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Adresse de l\'établissement' })
  @IsString()
  @IsNotEmpty()
  adresse: string;

  @ApiPropertyOptional({ description: 'Description de l\'établissement' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Numéro de téléphone' })
  @IsString()
  @IsOptional()
  telephone?: string;

  @ApiPropertyOptional({ description: 'Adresse email' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Site web' })
  @IsString()
  @IsOptional()
  siteWeb?: string;

  @ApiPropertyOptional({ description: 'Images de l\'établissement' })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ description: 'ID du propriétaire' })
  @IsString()
  @IsNotEmpty()
  proprietaire: string;

  @ApiPropertyOptional({ description: 'Localisation' })
  @IsObject()
  @IsOptional()
  localisation?: {
    latitude: number;
    longitude: number;
  };

  @ApiPropertyOptional({ description: 'Horaires d\'ouverture' })
  @IsObject()
  @IsOptional()
  horaires?: {
    [key: string]: {
      ouverture: string;
      fermeture: string;
    };
  };

  @ApiPropertyOptional({ description: 'Services proposés' })
  @IsArray()
  @IsOptional()
  services?: {
    nom: string;
    description: string;
    prix: number;
    disponible: boolean;
  }[];

  @ApiPropertyOptional({ description: 'État actif de l\'établissement' })
  @IsBoolean()
  @IsOptional()
  actif?: boolean;

  @ApiPropertyOptional({ description: 'Configuration de l\'établissement' })
  @IsObject()
  @IsOptional()
  configuration?: {
    wifiDisponible: boolean;
    parkingGratuit: boolean;
    accepteCarteCredit: boolean;
    serviceEnChambre: boolean;
  };
}
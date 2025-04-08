import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsObject, IsArray, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ description: 'Nom du service' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: 'Description du service' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Prix du service' })
  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @ApiProperty({ description: 'Catégorie du service' })
  @IsString()
  @IsNotEmpty()
  categorie: string;

  @ApiProperty({ description: 'ID de l\'établissement' })
  @IsString()
  @IsNotEmpty()
  etablissement: string;

  @ApiPropertyOptional({ description: 'Disponibilité du service' })
  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @ApiPropertyOptional({ description: 'Images du service' })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ description: 'Horaires du service' })
  @IsObject()
  @IsOptional()
  horaires?: {
    [key: string]: {
      debut: string;
      fin: string;
    };
  };

  @ApiPropertyOptional({ description: 'Durée du service en minutes' })
  @IsNumber()
  @IsOptional()
  dureeMinutes?: number;

  @ApiPropertyOptional({ description: 'Réduction en pourcentage' })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  reduction?: number;

  @ApiPropertyOptional({ description: 'Tags du service' })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ description: 'Options du service' })
  @IsObject()
  @IsOptional()
  options?: {
    reservationRequise: boolean;
    nombrePersonnesMax: number;
    equipementsNecessaires: string[];
  };
}
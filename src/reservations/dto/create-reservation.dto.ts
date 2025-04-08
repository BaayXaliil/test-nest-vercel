import { IsString, IsNotEmpty, IsDate, IsNumber, IsArray, IsObject, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @ApiProperty({ description: 'ID du client' })
  @IsString()
  @IsNotEmpty()
  client: string;

  @ApiProperty({ description: 'ID de l\'établissement' })
  @IsString()
  @IsNotEmpty()
  etablissement: string;

  @ApiProperty({ description: 'Date de début de la réservation' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateDebut: Date;

  @ApiProperty({ description: 'Date de fin de la réservation' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateFin: Date;

  @ApiProperty({ description: 'Nombre de personnes' })
  @IsNumber()
  @IsNotEmpty()
  nombrePersonnes: number;

  @ApiPropertyOptional({ description: 'Services réservés' })
  @IsArray()
  @IsOptional()
  services?: {
    nom: string;
    quantite: number;
    prix: number;
  }[];

  @ApiProperty({ description: 'Prix total de la réservation' })
  @IsNumber()
  @IsNotEmpty()
  prixTotal: number;

  @ApiProperty({ description: 'Statut de la réservation', enum: ['EN_ATTENTE', 'CONFIRMEE', 'ANNULEE', 'TERMINEE'] })
  @IsEnum(['EN_ATTENTE', 'CONFIRMEE', 'ANNULEE', 'TERMINEE'])
  @IsNotEmpty()
  statut: string;

  @ApiPropertyOptional({ description: 'Informations de paiement' })
  @IsObject()
  @IsOptional()
  paiement?: {
    methode: string;
    statut: string;
    reference: string;
    montantPaye: number;
  };

  @ApiPropertyOptional({ description: 'Commentaires' })
  @IsString()
  @IsOptional()
  commentaires?: string;

  @ApiPropertyOptional({ description: 'Informations de check-in' })
  @IsObject()
  @IsOptional()
  checkIn?: {
    effectue: boolean;
    date: Date;
  };

  @ApiPropertyOptional({ description: 'Informations de check-out' })
  @IsObject()
  @IsOptional()
  checkOut?: {
    effectue: boolean;
    date: Date;
  };
}
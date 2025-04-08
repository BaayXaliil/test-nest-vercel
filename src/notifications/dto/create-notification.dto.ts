import { IsString, IsNotEmpty, IsEnum, IsOptional, IsObject, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateNotificationDto {
  @ApiProperty({ description: 'ID du destinataire' })
  @IsString()
  @IsNotEmpty()
  destinataire: string;

  @ApiProperty({ description: 'Titre de la notification' })
  @IsString()
  @IsNotEmpty()
  titre: string;

  @ApiProperty({ description: 'Message de la notification' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ description: 'Type de notification', enum: ['INFO', 'SUCCESS', 'WARNING', 'ERROR'] })
  @IsEnum(['INFO', 'SUCCESS', 'WARNING', 'ERROR'])
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Canal de notification', enum: ['EMAIL', 'SMS', 'PUSH', 'INAPP'] })
  @IsEnum(['EMAIL', 'SMS', 'PUSH', 'INAPP'])
  @IsNotEmpty()
  canal: string;

  @ApiPropertyOptional({ description: 'État de lecture' })
  @IsBoolean()
  @IsOptional()
  lu?: boolean;

  @ApiPropertyOptional({ description: 'Métadonnées de la notification' })
  @IsObject()
  @IsOptional()
  metadata?: {
    lien?: string;
    imageUrl?: string;
    actionRequise?: boolean;
    donnees?: Record<string, any>;
  };

  @ApiPropertyOptional({ description: 'Date d\'expiration' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateExpiration?: Date;

  @ApiPropertyOptional({ description: 'État d\'archivage' })
  @IsBoolean()
  @IsOptional()
  archive?: boolean;

  @ApiPropertyOptional({ description: 'Date de lecture' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateLecture?: Date;
}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EtablissementsController } from './etablissements.controller';
import { EtablissementsService } from './etablissements.service';
import { EtablissementSchema } from './schemas/etablissement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Etablissement', schema: EtablissementSchema },
    ]),
  ],
  controllers: [EtablissementsController],
  providers: [EtablissementsService],
  exports: [EtablissementsService],
})
export class EtablissementsModule {}
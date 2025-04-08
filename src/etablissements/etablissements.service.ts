import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Etablissement } from './schemas/etablissement.schema';
import { CreateEtablissementDto } from './dto/create-etablissement.dto';
import { UpdateEtablissementDto } from './dto/update-etablissement.dto';

@Injectable()
export class EtablissementsService {
  constructor(
    @InjectModel('Etablissement') private etablissementModel: Model<Etablissement>,
  ) {}

  async create(createEtablissementDto: CreateEtablissementDto): Promise<Etablissement> {
    const newEtablissement = new this.etablissementModel(createEtablissementDto);
    return newEtablissement.save();
  }

  async findAll(): Promise<Etablissement[]> {
    return this.etablissementModel.find().populate('proprietaire').exec();
  }

  async findOne(id: string): Promise<Etablissement> {
    const etablissement = await this.etablissementModel.findById(id).populate('proprietaire').exec();
    if (!etablissement) {
      throw new NotFoundException(`Établissement #${id} non trouvé`);
    }
    return etablissement;
  }

  async update(id: string, updateEtablissementDto: UpdateEtablissementDto): Promise<Etablissement> {
    const etablissement = await this.etablissementModel
      .findByIdAndUpdate(id, updateEtablissementDto, { new: true })
      .exec();
    if (!etablissement) {
      throw new NotFoundException(`Établissement #${id} non trouvé`);
    }
    return etablissement;
  }

  async remove(id: string): Promise<void> {
    const result = await this.etablissementModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Établissement #${id} non trouvé`);
    }
  }
}
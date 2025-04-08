import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('Service') private readonly serviceModel: Model<Service>
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = new this.serviceModel(createServiceDto);
    return newService.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel
      .find()
      .populate('etablissement')
      .exec();
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel
      .findById(id)
      .populate('etablissement')
      .exec();

    if (!service) {
      throw new NotFoundException(`Service #${id} non trouvé`);
    }
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();

    if (!service) {
      throw new NotFoundException(`Service #${id} non trouvé`);
    }
    return service;
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Service #${id} non trouvé`);
    }
  }

  async findByEtablissement(etablissementId: string): Promise<Service[]> {
    return this.serviceModel
      .find({ etablissement: etablissementId })
      .exec();
  }

  async findByCategorie(categorie: string): Promise<Service[]> {
    return this.serviceModel
      .find({ categorie })
      .populate('etablissement')
      .exec();
  }

  async updateDisponibilite(id: string, disponible: boolean): Promise<Service> {
    const service = await this.serviceModel
      .findByIdAndUpdate(
        id,
        { disponible },
        { new: true }
      )
      .exec();

    if (!service) {
      throw new NotFoundException(`Service #${id} non trouvé`);
    }
    return service;
  }

  async updatePrix(id: string, prix: number): Promise<Service> {
    const service = await this.serviceModel
      .findByIdAndUpdate(
        id,
        { prix },
        { new: true }
      )
      .exec();

    if (!service) {
      throw new NotFoundException(`Service #${id} non trouvé`);
    }
    return service;
  }

  async findByTags(tags: string[]): Promise<Service[]> {
    return this.serviceModel
      .find({ tags: { $in: tags } })
      .populate('etablissement')
      .exec();
  }

  async findAvailable(): Promise<Service[]> {
    return this.serviceModel
      .find({ disponible: true })
      .populate('etablissement')
      .exec();
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Service[]> {
    return this.serviceModel
      .find({
        prix: { 
          $gte: minPrice,
          $lte: maxPrice
        }
      })
      .populate('etablissement')
      .exec();
  }
}
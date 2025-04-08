import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel('Reservation') private reservationModel: Model<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const newReservation = new this.reservationModel(createReservationDto);
    return newReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel
      .find()
      .populate('client')
      .populate('etablissement')
      .exec();
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationModel
      .findById(id)
      .populate('client')
      .populate('etablissement')
      .exec();
    if (!reservation) {
      throw new NotFoundException(`Réservation #${id} non trouvée`);
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.reservationModel
      .findByIdAndUpdate(id, updateReservationDto, { new: true })
      .exec();
    if (!reservation) {
      throw new NotFoundException(`Réservation #${id} non trouvée`);
    }
    return reservation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.reservationModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Réservation #${id} non trouvée`);
    }
  }

  async findByClient(clientId: string): Promise<Reservation[]> {
    return this.reservationModel
      .find({ client: clientId })
      .populate('etablissement')
      .exec();
  }

  async findByEtablissement(etablissementId: string): Promise<Reservation[]> {
    return this.reservationModel
      .find({ etablissement: etablissementId })
      .populate('client')
      .exec();
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = new this.notificationModel(createNotificationDto);
    return newNotification.save();
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel
      .find()
      .populate('destinataire')
      .exec();
  }

  async findByDestinataire(destinataireId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({ 
        destinataire: destinataireId,
        archive: false 
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getUnreadCount(destinataireId: string): Promise<number> {
    return this.notificationModel
      .countDocuments({ 
        destinataire: destinataireId,
        lu: false,
        archive: false
      })
      .exec();
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.notificationModel
      .findByIdAndUpdate(
        id,
        { 
          lu: true,
          dateLecture: new Date()
        },
        { new: true }
      )
      .exec();

    if (!notification) {
      throw new NotFoundException(`Notification #${id} non trouvée`);
    }
    return notification;
  }

  async archive(id: string): Promise<Notification> {
    const notification = await this.notificationModel
      .findByIdAndUpdate(
        id,
        { archive: true },
        { new: true }
      )
      .exec();

    if (!notification) {
      throw new NotFoundException(`Notification #${id} non trouvée`);
    }
    return notification;
  }

  async deleteExpired(): Promise<void> {
    await this.notificationModel
      .deleteMany({
        dateExpiration: { $lt: new Date() }
      })
      .exec();
  }
}
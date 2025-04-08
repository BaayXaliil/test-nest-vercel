import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicesService } from './services.service';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

const mockService = {
  nom: 'Service Test',
  description: 'Description test',
  prix: 100,
  categorie: 'Test',
  etablissement: 'etablissement-id',
};

describe('ServicesService', () => {
  let service: ServicesService;
  let model: Model<ServiceDocument>;

  const mockServiceModel = {
    new: jest.fn().mockResolvedValue(mockService),
    constructor: jest.fn().mockResolvedValue(mockService),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
    populate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getModelToken(Service.name),
          useValue: mockServiceModel,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    model = module.get<Model<ServiceDocument>>(getModelToken(Service.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new service', async () => {
      const createServiceDto: CreateServiceDto = mockService;
      mockServiceModel.save.mockResolvedValue(mockService);

      const result = await service.create(createServiceDto);
      expect(result).toEqual(mockService);
    });
  });

  describe('findAll', () => {
    it('should return an array of services', async () => {
      const mockServices = [mockService];
      mockServiceModel.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockServices),
        }),
      });

      const result = await service.findAll();
      expect(result).toEqual(mockServices);
    });
  });

  describe('findOne', () => {
    it('should return a service by id', async () => {
      mockServiceModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockService),
        }),
      });

      const result = await service.findOne('test-id');
      expect(result).toEqual(mockService);
    });

    it('should throw NotFoundException when service is not found', async () => {
      mockServiceModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(service.findOne('test-id')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a service', async () => {
      const updateServiceDto: UpdateServiceDto = { prix: 150 };
      const updatedService = { ...mockService, prix: 150 };

      mockServiceModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedService),
      });

      const result = await service.update('test-id', updateServiceDto);
      expect(result).toEqual(updatedService);
    });

    it('should throw NotFoundException when service to update is not found', async () => {
      mockServiceModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.update('test-id', {})).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a service', async () => {
      mockServiceModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      await expect(service.remove('test-id')).resolves.not.toThrow();
    });

    it('should throw NotFoundException when service to remove is not found', async () => {
      mockServiceModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });

      await expect(service.remove('test-id')).rejects.toThrow();
    });
  });

  describe('findByEtablissement', () => {
    it('should return services for a specific etablissement', async () => {
      const mockServices = [mockService];
      mockServiceModel.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockServices),
        }),
      });

      const result = await service.findByEtablissement('etablissement-id');
      expect(result).toEqual(mockServices);
    });
  });
});
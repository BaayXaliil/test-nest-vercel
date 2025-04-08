import * as mongoose from 'mongoose';

export interface Service extends mongoose.Document {
  nom: string;
  description: string;
  prix: number;
  categorie: string;
  disponible: boolean;
  etablissement: mongoose.Types.ObjectId;
  images?: string[];
  horaires?: {
    [key: string]: {
      debut: string;
      fin: string;
    };
  };
  dureeMinutes?: number;
  reduction?: number;
  tags?: string[];
  options?: {
    reservationRequise: boolean;
    nombrePersonnesMax: number;
    equipementsNecessaires: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export const ServiceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  categorie: { type: String, required: true },
  disponible: { type: Boolean, default: true },
  etablissement: { type: mongoose.Schema.Types.ObjectId, ref: 'Etablissement', required: true },
  images: [String],
  horaires: {
    type: Map,
    of: {
      debut: String,
      fin: String
    }
  },
  dureeMinutes: { type: Number, default: 0 },
  reduction: { type: Number, min: 0, max: 100 },
  tags: [String],
  options: {
    reservationRequise: Boolean,
    nombrePersonnesMax: Number,
    equipementsNecessaires: [String]
  }
}, { timestamps: true });
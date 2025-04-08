import * as mongoose from 'mongoose';

export interface Etablissement extends mongoose.Document {
  nom: string;
  type: string;
  adresse: string;
  description?: string;
  telephone?: string;
  email?: string;
  siteWeb?: string;
  images?: string[];
  proprietaire: mongoose.Types.ObjectId;
  localisation?: {
    latitude: number;
    longitude: number;
  };
  horaires?: {
    [key: string]: {
      ouverture: string;
      fermeture: string;
    };
  };
  services?: {
    nom: string;
    description: string;
    prix: number;
    disponible: boolean;
  }[];
  actif: boolean;
  configuration?: {
    wifiDisponible: boolean;
    parkingGratuit: boolean;
    accepteCarteCredit: boolean;
    serviceEnChambre: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const EtablissementSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  adresse: { type: String, required: true },
  description: String,
  telephone: String,
  email: String,
  siteWeb: String,
  images: [String],
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  localisation: {
    latitude: Number,
    longitude: Number
  },
  horaires: {
    type: Map,
    of: {
      ouverture: String,
      fermeture: String
    }
  },
  services: [{
    nom: String,
    description: String,
    prix: Number,
    disponible: Boolean
  }],
  actif: { type: Boolean, default: true },
  configuration: {
    wifiDisponible: Boolean,
    parkingGratuit: Boolean,
    accepteCarteCredit: Boolean,
    serviceEnChambre: Boolean
  }
}, { timestamps: true });
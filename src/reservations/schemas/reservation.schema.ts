import * as mongoose from 'mongoose';

export interface Reservation extends mongoose.Document {
  client: mongoose.Types.ObjectId;
  etablissement: mongoose.Types.ObjectId;
  dateDebut: Date;
  dateFin: Date;
  nombrePersonnes: number;
  services?: {
    nom: string;
    quantite: number;
    prix: number;
  }[];
  prixTotal: number;
  statut: string;
  paiement?: {
    methode: string;
    statut: string;
    reference: string;
    montantPaye: number;
  };
  commentaires?: string;
  checkIn?: {
    effectue: boolean;
    date: Date;
  };
  checkOut?: {
    effectue: boolean;
    date: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const ReservationSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  etablissement: { type: mongoose.Schema.Types.ObjectId, ref: 'Etablissement', required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  nombrePersonnes: { type: Number, required: true },
  services: [{
    nom: String,
    quantite: Number,
    prix: Number
  }],
  prixTotal: { type: Number, required: true },
  statut: { 
    type: String, 
    required: true, 
    enum: ['EN_ATTENTE', 'CONFIRMEE', 'ANNULEE', 'TERMINEE'] 
  },
  paiement: {
    methode: String,
    statut: String,
    reference: String,
    montantPaye: Number
  },
  commentaires: String,
  checkIn: {
    effectue: Boolean,
    date: Date
  },
  checkOut: {
    effectue: Boolean,
    date: Date
  }
}, { timestamps: true });
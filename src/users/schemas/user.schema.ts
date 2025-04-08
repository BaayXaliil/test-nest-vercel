import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
  telephone?: string;
  preferences?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['ADMIN', 'ETABLISSEMENT', 'CLIENT'] },
  telephone: { type: String },
  preferences: { type: Map, of: mongoose.Schema.Types.Mixed },
}, { timestamps: true });
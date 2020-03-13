import mongoose, { Schema, Document } from 'mongoose';

export interface IInstitute extends Document {
  name: string
  address: string
}

const InstituteSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  },
  address: {
    type: String,
    required: [true, 'El campo dirección es requerido']
  },
});

// Export the model and return your IUser interface
export default mongoose.model<IInstitute>('Institute', InstituteSchema);

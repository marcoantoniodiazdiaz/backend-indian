import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string
  secondName: string
  password: string
  institute: string
  email: string
  role: string
  activated: string
}

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  },
  secondName: {
    type: String,
    required: [true, 'El campo apellido es requerido']
  },
  institute: {
    type: String,
    required: [true, 'El campo instituto es requerido']
  },
  email: {
    type: String,
    required: [true, 'El campo email es requerido']
  },
  role: {
    type: String,
    default: 'USER_ROLE'
  },
  password: {
    type: String,
    default: 'default'
  },
  activated: {
    type: Boolean,
    default: false
  },
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>('Users', UserSchema);

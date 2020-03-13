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
    type: String
  },
  institute: {
    type: String
  },
  email: {
    type: String
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

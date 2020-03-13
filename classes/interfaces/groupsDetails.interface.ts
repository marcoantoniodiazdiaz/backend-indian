import mongoose, { Schema, Document, SchemaType, SchemaTypes } from 'mongoose';

export interface IGroupsDetais extends Document {
    group: string // FK
    user: string // FK
    userDateLogin: string
}

const GroupsDetailsSchema: Schema = new Schema({
    group: {
        type: SchemaTypes.ObjectId,
        required: [true, 'El campo grupo es requerido']
    },
    user: {
        type: SchemaTypes.ObjectId,
        required: [true, 'El campo usuario es requerido']
    },
    userDateLogin: {
        type: String,
        required: [true, 'El campo fecha de inicio de sesión es requerido']
    },
});

// Export the model and return your IUser interface
export default mongoose.model<IGroupsDetais>('GroupDetails', GroupsDetailsSchema);

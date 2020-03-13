import mongoose, { Schema, Document } from 'mongoose';

export interface IGroups extends Document {
    name: string
    createDate: string
    createUser: string // FK
}

const GroupsSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },
    createDate: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },
    createUser: {
        type: Schema.Types.ObjectId,
        required: [true, 'El campo nombre es requerido']
    },
});

// Export the model and return your IUser interface
export default mongoose.model<IGroups>('Groups', GroupsSchema);

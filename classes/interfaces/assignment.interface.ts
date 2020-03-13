import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
    publishDate: string
    expireDate: string
    points: string
    description: string
    group: string
}

const AssignmentSchema: Schema = new Schema({
    publishDate: {
        type: String,
        required: [true, 'El campo fecha de publicación es requerido']
    },
    expireDate: {
        type: String,
        required: [true, 'El campo fecha de caducidad es requerido']
    },
    points: {
        type: Number,
        required: [true, 'El campo puntos es requerido']
    },
    description: {
        type: Number,
        required: [true, 'El campo descripción es requerido']
    },
    group: {
        type: Schema.Types.ObjectId,
        required: [true, 'El campo grupo es requerido']
    },
});

// Export the model and return your IUser interface
export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);

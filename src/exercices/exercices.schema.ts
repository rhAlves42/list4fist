import { ObjectId } from 'mongodb';
import { Model, Schema } from 'mongoose';
import { ExerciceDocument } from './interfaces/exercices.interface';


export const ExercicesSchema = new Schema ({
    _id: { type: ObjectId, auto: true },
    name: String,
    level: String,
    duration: String,
    value: Number,
    trainingType: Number,
});

export type ExercicesModel = Model<ExerciceDocument>;
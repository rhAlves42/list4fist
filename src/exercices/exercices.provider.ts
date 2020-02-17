import { Connection } from 'mongoose';
import { ExercicesSchema } from './exercices.schema';
import { DATABASE_CONNECTION } from '../database/database.providers';


export const EXERCICES_MODEL = 'EXERCICES_MODEL';

export const exercicesProvider = [
    {
        provide: EXERCICES_MODEL,
        useFactory: (connection: Connection) =>
            connection.model('Exercices', ExercicesSchema),
        inject: [DATABASE_CONNECTION],
    }
];
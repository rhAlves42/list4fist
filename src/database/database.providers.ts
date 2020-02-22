import * as mongoose from 'mongoose';
import { KEYS } from '../config';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: (): Promise<any> =>
            mongoose.connect(KEYS.mongo_url, {
                useNewUrlParser: true,
                useFindAndModify: false, 
            }),
    }
];

import { mongo } from "mongoose";
import { mongodb_connection_uri } from './database.config';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: ():Promise<any> => 
            mongo.connect(mongodb_connection_uri, {useNewUrlParser: true})
    }
];
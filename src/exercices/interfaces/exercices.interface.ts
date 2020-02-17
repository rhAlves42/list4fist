import { Document } from "mongoose";

export interface Exercices {
    name: string;
    level: string;
    duration: string;
    value: number;
    trainingType: number;   
}

export interface ExerciceDocument extends Document, Exercices {}

// https://dev.to/itminds/how-to-architecture-your-javascript-api-using-nestjs-with-a-graphql-api-example-part-2-2-55pn
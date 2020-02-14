import { Module } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { ExercicesResolver } from './exercices.resolver';
import { ExercicesController } from './exercices.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
   }),
   MongooseModule.forRoot(
     'mongodb://localhost/nestgraphql'
    ),
  ],
  controllers: [ExercicesController],
  providers: [ExercicesService, ExercicesResolver],
})
export class ExercicesModule {}

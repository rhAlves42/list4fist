import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercicesController } from './exercices/exercices.controller';
import { ExercicesModule } from './exercices/exercices.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ExercicesModule, 
    GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
   }),
   MongooseModule.forRoot(
     'mongodb://localhost/nestgraphql'
    ),
  ],
  controllers: [AppController, ExercicesController],
  providers: [AppService],
})
export class AppModule {}

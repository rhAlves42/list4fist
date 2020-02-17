import { Module } from '@nestjs/common';
import { ExercicesController } from './exercices.controller';
import { DatabaseModule } from 'src/database/database.module';
import { exercicesProvider } from './exercices.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ExercicesController],
  providers: [...exercicesProvider],
})
export class ExercicesModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercicesController } from './exercices/exercices.controller';
import { ExercicesModule } from './exercices/exercices.module';
@Module({
  imports: [ExercicesModule],
  controllers: [AppController, ExercicesController],
  providers: [AppService],
})
export class AppModule {}

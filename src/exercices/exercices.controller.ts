import { Controller, Get } from '@nestjs/common';


@Controller('exercices')
export class ExercicesController {
    @Get()
    findAll() {
        return 'list of exercices'
    }
}

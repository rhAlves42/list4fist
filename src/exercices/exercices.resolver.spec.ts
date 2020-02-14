import { Test, TestingModule } from '@nestjs/testing';
import { ExercicesResolver } from './exercices.resolver';

describe('ExercicesResolver', () => {
  let resolver: ExercicesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercicesResolver],
    }).compile();

    resolver = module.get<ExercicesResolver>(ExercicesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

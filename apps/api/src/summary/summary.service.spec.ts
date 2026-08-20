import { Test, TestingModule } from '@nestjs/testing';
import { SummaryService } from './summary.service';

describe('summaryService', () => {
  let service: summaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [summaryService],
    }).compile();

    service = module.get<summaryService>(summaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

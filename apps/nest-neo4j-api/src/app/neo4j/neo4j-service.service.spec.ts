import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jServiceService } from './neo4j-service.service';

describe('Neo4jServiceService', () => {
  let service: Neo4jServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jServiceService],
    }).compile();

    service = module.get<Neo4jServiceService>(Neo4jServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

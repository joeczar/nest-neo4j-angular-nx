import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { Neo4jModule } from './neo4j/neo4j.module'; // Import the module containing NEO4J
describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [Neo4jModule.forRoot({ boltUrl: 'bolt://localhost:7687' })], // Provide a valid Bolt URL
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' }); // Update the expected response
    });
  });
});

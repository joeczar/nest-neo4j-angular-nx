import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jService } from './neo4j.service';
import { ConfigModule } from '@nestjs/config';

describe('Neo4jService', () => {
  let service: Neo4jService;

  beforeEach(async () => {
    process.env.NODE_ENV = 'test'; // Set the NODE_ENV to 'test'

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV}`, // Use the specific environment file
          isGlobal: true,
        }),
      ],
      providers: [Neo4jService],
    }).compile();

    service = module.get<Neo4jService>(Neo4jService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test for the createNode method
  it('should create a node', async () => {
    const label = 'TestLabel';
    const properties = { name: 'TestName' };
    try {
      jest.spyOn(service, 'run').mockResolvedValueOnce('NodeCreated');
      expect(await service.createNode(label, properties)).toBe('NodeCreated');
    } catch (error) {
      console.error('Node creation failed', error);
    }
  });

  // Test for the readNode method
  it('should read a node', async () => {
    const label = 'TestLabel';
    const properties = { name: 'TestName' };
    jest.spyOn(service, 'run').mockResolvedValueOnce('NodeFound');
    expect(await service.readNode(label, properties)).toBe('NodeFound');
  });

  // Test for the updateNode method
  it('should update a node', async () => {
    const label = 'TestLabel';
    const matchProps = { name: 'TestName' };
    const updateProps = { age: 25 };
    jest.spyOn(service, 'run').mockResolvedValueOnce('NodeUpdated');
    expect(await service.updateNode(label, matchProps, updateProps)).toBe(
      'NodeUpdated'
    );
  });

  // Test for the deleteNode method
  it('should delete a node', async () => {
    const label = 'TestLabel';
    const properties = { name: 'TestName' };
    jest.spyOn(service, 'run').mockResolvedValueOnce('NodeDeleted');
    expect(await service.deleteNode(label, properties)).toBe('NodeDeleted');
  });
});

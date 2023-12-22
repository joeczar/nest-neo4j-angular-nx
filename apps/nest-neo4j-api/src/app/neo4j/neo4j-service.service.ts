import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import neo4j from 'neo4j-driver';

@Injectable()
export class Neo4jServiceService {
  private readonly neo4jDriver;

  constructor(private configService: ConfigService) {
    this.neo4jDriver = neo4j.driver(
      configService.get<string>('NEO4J_URI'),
      neo4j.auth.basic(
        configService.get('NEO4J_USERNAME'),
        configService.get('NEO4J_PASSWORD')
      )
    );
  }
}

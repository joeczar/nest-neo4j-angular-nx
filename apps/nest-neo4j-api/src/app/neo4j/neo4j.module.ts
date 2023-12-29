import { DynamicModule, Global, Module } from '@nestjs/common';
import neo4j from 'neo4j-driver';
import { Neo4jService } from './neo4j.service';

export interface Neo4jOptions {
  uri: string;
  username: string;
  password: string;
}

@Global()
@Module({})
export class Neo4jModule {
  static forRoot(options: Neo4jOptions): DynamicModule {
    return {
      module: Neo4jModule,
      providers: [
        {
          provide: 'NEO4J',
          useFactory: () =>
            neo4j.driver(
              options.uri,
              neo4j.auth.basic(options.username, options.password)
            ),
        },
        Neo4jService,
      ],
      exports: ['NEO4J', Neo4jService],
    };
  }
}

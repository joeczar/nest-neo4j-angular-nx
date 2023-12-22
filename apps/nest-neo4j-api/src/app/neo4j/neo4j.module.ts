import { Global, Module } from '@nestjs/common';
import neo4j from 'neo4j-driver';

@Global()
@Module({
  providers: [
    {
      provide: 'NEO4J',
      useFactory: () =>
        neo4j.driver(
          process.env.NEO4J_URI,
          neo4j.auth.basic(
            process.env.NEO4J_USERNAME,
            process.env.NEO4J_PASSWORD
          )
        ),
    },
  ],
  exports: ['NEO4J'],
})
export class Neo4jModule {}

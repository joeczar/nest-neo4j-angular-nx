import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from './neo4j/neo4j.module';
import { Neo4jOptions } from './neo4j/neo4j.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Neo4jModule.forRoot({
      uri: process.env.NEO4J_URI, // Add the 'uri' property
      boltUrl: process.env.NEO4J_URI,
      username: process.env.NEO4J_USERNAME,
      password: process.env.NEO4J_PASSWORD,
    } as Neo4jOptions),
    AuthModule, // Add 'as Neo4jOptions' to specify the type
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

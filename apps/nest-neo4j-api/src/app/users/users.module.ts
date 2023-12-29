import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { UsersController } from './users.controller';
// You may need a custom module to handle Neo4j connections

@Module({
  imports: [Neo4jModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService for use in AuthModule
})
export class UsersModule {}

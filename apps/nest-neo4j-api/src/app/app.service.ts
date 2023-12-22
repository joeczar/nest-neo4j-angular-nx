import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('NEO4J') private readonly neo4j) {}

  getData(): { message: string; poop: unknown } {
    const poop = this.someFunction();
    return { message: 'Hello API', poop };
  }
  async someFunction() {
    const session = this.neo4j.session();
    try {
      const result = await session.run('MATCH (n) RETURN n LIMIT 10');
      return result.records;
    } finally {
      await session.close();
    }
  }
}

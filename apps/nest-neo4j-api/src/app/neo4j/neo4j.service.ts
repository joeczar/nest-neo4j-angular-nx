import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import neo4j, {
  Driver,
  Node as Neo4jNode,
  Record as Neo4jRecord,
} from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private readonly driver: Driver;

  constructor(private readonly configService: ConfigService) {
    this.driver = neo4j.driver(
      this.configService.get('NEO4J_URI'),
      neo4j.auth.basic(
        this.configService.get('NEO4J_USERNAME'),
        this.configService.get('NEO4J_PASSWORD')
      )
    );
  }

  /**
   * Initialize the Neo4j driver.
   */
  onModuleInit(): void {
    console.log('Neo4j driver initialized successfully.');
  }

  /**
   * Close the Neo4j driver.
   */
  onModuleDestroy(): void {
    this.driver.close();
    console.log('Neo4j driver closed.');
  }

  async run(query: string, parameters: Record<string, unknown>) {
    const session = this.driver.session();
    try {
      const result = await session.run(query, parameters);
      return result.records;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      await session.close();
    }
  }

  async createNode(label: string, properties: Record<string, unknown>) {
    const query = `CREATE (n:${label} $props) RETURN n`;
    const result = await this.run(query, { props: properties });

    if (result && result.length > 0) {
      const record = result[0];
      const node = record.get('n') as Neo4jNode;
      if (node && node.properties) {
        return node.properties;
      }
    }

    throw new Error('Node creation failed');
  }

  async readNode(label: string, properties: Record<string, unknown>) {
    const matchClauses = this.getMatchClauses(properties);
    const query = `MATCH (n:${label}) WHERE ${matchClauses} RETURN n`;
    const result = await this.run(query, properties);
    return result.map((record) => record.get('n').properties);
  }

  async updateNode(
    label: string,
    matchProps: Record<string, unknown>,
    updateProps: Record<string, unknown>
  ) {
    const matchClauses = this.getMatchClauses(matchProps);
    const setClauses = Object.keys(updateProps)
      .map((key) => `n.${key} = $${key}`)
      .join(', ');

    const parameters = { ...matchProps };
    for (const [key, value] of Object.entries(updateProps)) {
      parameters[`updated_${key}`] = value;
    }
    const query = `
      MATCH (n:${label}) WHERE ${matchClauses}
      SET ${setClauses}
      RETURN n
    `;
    const result = this.run(query, { matchProps, updateProps });
    return result;
  }

  async deleteNode(
    label: string,
    properties: Record<string, unknown>
  ): Promise<unknown> {
    const matchClauses = this.getMatchClauses(properties);
    const query = `MATCH (n:${label}) WHERE ${matchClauses} DELETE n`;
    const result = this.run(query, { props: properties });
    return result;
  }

  async findOne(
    label: string,
    properties: Record<string, unknown>
  ): Promise<unknown> {
    const matchClauses = this.getMatchClauses(properties);
    const query = `MATCH (n:${label}) WHERE ${matchClauses} RETURN n LIMIT 1`;
    const result = await this.run(query, properties);

    if (result && Array.isArray(result) && result.length > 0) {
      return result[0].get('n').properties;
    }

    return undefined;
  }

  async findAll(label: string, properties: Record<string, unknown>) {
    let query = `MATCH (n:${label})`;
    if (Object.keys(properties).length > 0) {
      const matchClauses = this.getMatchClauses(properties);
      query += ` WHERE ${matchClauses}`;
    }
    query += ' RETURN n';
    return this.run(query, properties);
  }

  private getMatchClauses<T extends object>(properties: T): string {
    return Object.keys(properties)
      .map((key) => `n.${key} = $${key}`)
      .join(' AND ');
  }
}

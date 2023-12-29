import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Neo4jService } from '../neo4j/neo4j.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './interfaces/user.interface';

/**
 * Service for managing users in the Neo4j database.
 */
@Injectable()
export class UsersService {
  constructor(private readonly neo4jService: Neo4jService) {}

  /**
   * Creates a new user in the Neo4j database.
   * @param username - The username of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves to the created user.
   */
  async create(email: string, password: string): Promise<User> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: CreateUserDto = { email, password: hashedPassword };
    // Create user in Neo4j database
    const createdUser = (await this.neo4jService.createNode('User', {
      ...user,
    })) as User;

    return createdUser;
  }

  /**
   * Finds a user by username in the Neo4j database.
   * @param username - The username of the user to find.
   * @returns A Promise that resolves to the found user, or undefined if not found.
   */
  async findOne(username: string): Promise<User | undefined> {
    // Find user by username in Neo4j database
    const user = await this.neo4jService.findOne('User', { username });

    return user as User;
  }

  /**
   * Finds all users in the Neo4j database based on the provided properties.
   * @param properties - The properties to filter the users by.
   * @returns A Promise that resolves to an array of users.
   */
  async findAll(properties: Record<string, unknown>) {
    // Find all users in Neo4j database
    const users = await this.neo4jService.findAll('User', properties);

    return users;
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>) {
    const { password, email, username } = updateUserDto;
    const updatedUser = await this.neo4jService.updateNode(
      'User',
      {
        id,
      },
      { password, email, username }
    );

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    // Remove user from Neo4j database
    await this.neo4jService.deleteNode('User', { id });
  }
}

// src/users/entities/user.entity.ts

import { v4 as uuidv4 } from 'uuid';
import { Role } from './role.entity';

export class User {
  id: string;
  username: string;
  email: string;
  password?: string; // Stored as a hash
  roles: Role[];

  constructor(username: string, email: string, password: string) {
    this.id = uuidv4(); // Auto-generate a UUID for the user
    this.username = username;
    this.email = email;
    this.password = password; // Remember to hash before storing
    this.roles = []; // Initialize with empty roles
  }

  // Methods to manage user roles, badges, etc.
}

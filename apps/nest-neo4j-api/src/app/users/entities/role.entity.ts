import { v4 as uuidv4 } from 'uuid';

export class Role {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4(); // Auto-generate a UUID for the role
    this.name = name;
  }

  // Methods related to role management
}

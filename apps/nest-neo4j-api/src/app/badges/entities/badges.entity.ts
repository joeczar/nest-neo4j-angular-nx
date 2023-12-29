import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class Badge {
  id: string;
  name: string;
  description: string;
  criteria: string;
  imageURL: string;
  issuer: User; // Reference to the issuer User object

  constructor(
    name: string,
    description: string,
    criteria: string,
    imageURL: string,
    issuer: User
  ) {
    this.id = uuidv4(); // Auto-generate a UUID for the badge
    this.name = name;
    this.description = description;
    this.criteria = criteria;
    this.imageURL = imageURL;
    this.issuer = issuer;
  }

  // Methods related to badge management
}

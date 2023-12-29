// src/users/interfaces/user.interface.ts

import { UUID } from 'crypto';

export interface IUser {
  id: UUID; // UUID or some unique identifier
  username: string;
  email: string;
  password: string; // This will be stored as a hash
  roles: IRole[]; // A user can have multiple roles
}

export interface CreateUserDto {
  username?: string;
  email: string;
  password: string;
}

// src/users/interfaces/user.interface.ts

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  roles?: IRole[];
}

// src/users/interfaces/role.interface.ts

export interface IRole {
  id: UUID; // UUID or some unique identifier
  name: 'Issuer' | 'Earner' | 'Displayer' | 'Verifier' | 'Mentor';
}

// src/users/interfaces/badge.interface.ts
// interface IBadge {
//   id: string; // UUID or some unique identifier
//   name: string;
//   description: string;
//   criteria: string; // URL or description of how to earn the badge
//   imageURL: string;
//   issuer: IUser; // The user who issues this badge
// }

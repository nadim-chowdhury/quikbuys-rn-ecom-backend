import { SetMetadata } from '@nestjs/common';

// Define the key to be used for roles metadata
export const ROLES_KEY = 'roles';

// Custom decorator to set roles for a route
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

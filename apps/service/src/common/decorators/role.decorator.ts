/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Role = (...roles: Array<string>) =>
    SetMetadata(ROLES_KEY, roles);

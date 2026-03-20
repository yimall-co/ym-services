/* eslint-disable @typescript-eslint/no-unused-vars */
import { permissions } from 'shared/infrastructure/persistence/drizzle/schema';

import { Role } from 'iam/role/domain/role';

import { roles } from '../persistence/drizzle/roles.table';

type RoleWithPermissions = typeof roles.$inferSelect & {
    permissions?: Array<typeof permissions.$inferSelect>;
};

export class RoleMapper {
    static toDomain(primitives: RoleWithPermissions): Role {
        return Role.fromPrimitives({
            ...primitives,
            permissions: primitives.permissions?.map((permission) => permission.id) ?? [],
        });
    }

    static toPersistence(role: Role): typeof roles.$inferInsert {
        const primitives = role.toPrimitives();

        const { permissions, ...rest } = primitives;

        return {
            ...rest,
            description: primitives.description ?? null,
        };
    }
}

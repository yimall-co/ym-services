import { Permission } from 'iam/permission/domain/permission';

import { permissions } from '../persistence/drizzle/permissions.table';

export class PermissionMapper {
    static toDomain(primitives: typeof permissions.$inferSelect): Permission {
        return Permission.fromPrimitives({
            ...primitives,
            description: primitives.description ?? '',
        });
    }

    static toPersistence(permission: Permission): typeof permissions.$inferInsert {
        const primitives = permission.toPrimitives();

        return {
            ...primitives,
            description: primitives.description ?? null,
        };
    }
}
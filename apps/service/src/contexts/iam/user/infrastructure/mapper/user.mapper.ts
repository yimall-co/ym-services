/* eslint-disable @typescript-eslint/no-unused-vars */
import { roles } from 'shared/infrastructure/persistence/drizzle/schema';

import { User } from 'iam/user/domain/user';

import { users } from '../persistence/drizzle/users.table';

type UserWithRoles = typeof users.$inferSelect & {
    roles?: Array<typeof roles.$inferSelect>;
};

export class UserMapper {
    static toDomain(primitives: UserWithRoles): User {
        return User.fromPrimitives({
            ...primitives,
            image: primitives.image ?? '',
            roles: primitives.roles?.map((role) => role.id) ?? [],
        });
    }

    static toPersistence(user: User): typeof users.$inferInsert {
        const primitives = user.toPrimitives();

        const { roles, ...rest } = primitives;

        return {
            ...rest,
            image: primitives.image ?? null,
        };
    }
}

import { eq } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { UserId } from 'iam/shared/domain/user-id';
import { Profile } from 'iam/profiles/domain/profile';
import { ProfileRepository } from 'iam/profiles/domain/profile.repository';

import { profiles } from './drizzle/profiles.table';
import { ProfileMapper } from '../mapper/profile.mapper';

export class DrizzleProfileRepository
    extends DrizzleRepository<typeof profiles>
    implements ProfileRepository {
    protected readonly table = profiles;

    async existsByUserId(userId: UserId): Promise<boolean> {
        const rows = await this.client
            .select({ id: this.table.id })
            .from(this.table)
            .where(eq(this.table.userId, userId.value))
            .limit(1);

        return rows.length > 0;
    }

    async save(profile: Profile): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const existsByUserId = await this.existsByUserId(profile.getUserId());
            if (existsByUserId) {
                throw new Error('Profile already exists');
            }

            const { id, userId, ...rest } = ProfileMapper.toPersistence(profile);

            await tx
                .insert(this.table)
                .values(ProfileMapper.toPersistence(profile))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...rest,
                    },
                });
        });
    }
}

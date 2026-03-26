import { Profile } from 'iam/profiles/domain/profile';
import { Gender } from 'iam/profiles/domain/value-object/profile-gender';
import { Pronoun } from 'iam/profiles/domain/value-object/profile-pronoun';

import { profiles } from '../persistence/drizzle/profiles.table';

export class ProfileMapper {
    static toDomain(primitives: typeof profiles.$inferSelect): Profile {
        return Profile.fromPrimitives({
            ...primitives,
            gender: (primitives.gender as Gender) ?? Gender.OTHER,
            pronouns: (primitives.pronouns as Pronoun) ?? Pronoun.THEY_THEM,
            customGender: primitives.customGender ?? '',
            customPronouns: primitives.customPronouns ?? '',
            newsLetter: primitives.newsLetter ?? false,
            birthdate: primitives.birthdate ?? new Date().toISOString(),
        });
    }

    static toPersistence(profile: Profile): typeof profiles.$inferInsert {
        const primitives = profile.toPrimitives();

        return {
            ...primitives,
            gender: primitives.gender ?? 'other',
            pronouns: primitives.pronouns ?? 'other',
        };
    }
}

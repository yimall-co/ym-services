import { Profile } from 'iam/profiles/domain/profile';

import { profiles } from '../persistence/drizzle/profiles.table';
import { gender, Gender } from 'iam/profiles/domain/enum/gender';
import { pronoun, Pronoun } from 'iam/profiles/domain/enum/pronoun';

export class ProfileMapper {
    static toDomain(primitives: typeof profiles.$inferSelect): Profile {
        return Profile.fromPrimitives({
            ...primitives,
            gender: (primitives.gender as Gender) ?? gender.OTHER,
            pronouns: (primitives.pronouns as Pronoun) ?? pronoun.THEY_THEM,
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

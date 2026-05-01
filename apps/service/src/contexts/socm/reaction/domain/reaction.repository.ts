import { Uuid } from 'shared/domain/value-object/uuid';
import { Target } from 'shared/domain/value-object/target';

import { Reaction } from './reaction';
import { ReactionTargets } from './enum/reaction-targets';

export interface ReactionRepository {
    exists(userId: Uuid, target: Target<ReactionTargets>): Promise<boolean>;
    save(reaction: Reaction): Promise<void>;
}

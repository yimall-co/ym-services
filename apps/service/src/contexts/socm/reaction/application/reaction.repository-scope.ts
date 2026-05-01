import { ReactionRepository } from '../domain/reaction.repository';

export interface ReactionRepositoryScope {
    getReactionRepository(): ReactionRepository;
}

import { CategoryRepository } from '../domain/category.repository';
import { CategoryQueryRepository } from './query/category-query.repository';

export interface CategoryRepositoryScope {
    getCategoryRepository(): CategoryRepository;
    getCategoryQueryRepository(): CategoryQueryRepository;
}

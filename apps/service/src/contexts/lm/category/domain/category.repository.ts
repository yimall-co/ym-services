import { Category } from './category';

export interface CategoryRepository {
    save(category: Category): Promise<void>;
    update(category: Category): Promise<void>;
}

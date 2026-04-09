import { Category } from './category';
import { CategorySlug } from './value-object/category-slug';
import { CategoryWorkspaceId } from './value-object/category-workspace-id';

export interface CategoryRepository {
    existsBySlugAndWorkspace(
        slug: CategorySlug,
        workspaceId: CategoryWorkspaceId,
    ): Promise<boolean>;
    save(category: Category): Promise<void>;
    update(category: Category): Promise<void>;
}

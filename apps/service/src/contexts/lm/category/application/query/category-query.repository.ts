import { CategoryByIdDto } from './get-category-by-id/get-category-by-id.dto';
import { CategoryBySlugDto } from './get-category-by-slug/get-category-by-slug.dto';
import { CategoryByWorkspaceIdDto } from './get-categories-by-workspace-id/get-categories-by-workspace-id.dto';

export interface CategoryQueryRepository {
    findById(id: string): Promise<CategoryByIdDto | null>;
    findBySlug(slug: string): Promise<CategoryBySlugDto | null>;
    findAllByWorkspaceId(workspaceId: string): Promise<Array<CategoryByWorkspaceIdDto>>;
}

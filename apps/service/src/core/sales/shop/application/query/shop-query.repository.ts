import { ShopBySlugDto } from './get-shop-by-slug/dto';
import { ShopByWorkspaceDto } from './get-shops-by-workspace/dto';

export interface ShopQueryRepository {
    findAllByWorkspaceId(workspaceId: string): Promise<Array<ShopByWorkspaceDto>>;
    findOneBySlug(slug: string, workspaceId: string | null): Promise<ShopBySlugDto | null>;
}

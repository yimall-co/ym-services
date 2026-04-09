import { AggregateRoot } from 'shared/domain/aggregate-root';

import { CategoryId } from 'lm/shared/domain/category-id';
import { CategoryLabel } from './value-object/category-label';
import { CategorySlug } from './value-object/category-slug';
import { CategoryDescription } from './value-object/category-description';
import { CategoryBanner } from './value-object/category-banner';
import { CategoryPosition } from './value-object/category-position';
import { CategoryIsActive } from './value-object/category-is-active';
import { CategoryCreatedAt } from './value-object/category-created-at';
import { CategoryUpdatedAt } from './value-object/category-updated-at';
import { CategoryWorkspaceId } from './value-object/category-workspace-id';

export interface CategoryPrimitives {
    id: string;
    label: string;
    slug: string;
    description: string;
    banner: string;
    position: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
}

export class Category extends AggregateRoot<CategoryPrimitives> {
    private readonly id: CategoryId;
    private label: CategoryLabel;
    private slug: CategorySlug;
    private description: CategoryDescription;
    private banner: CategoryBanner;
    private position: CategoryPosition;
    private isActive: CategoryIsActive;
    private readonly createdAt: CategoryCreatedAt;
    private updatedAt: CategoryUpdatedAt;
    private workspaceId: CategoryWorkspaceId;

    constructor(
        id: CategoryId,
        label: CategoryLabel,
        slug: CategorySlug,
        description: CategoryDescription,
        banner: CategoryBanner,
        position: CategoryPosition,
        isActive: CategoryIsActive,
        createdAt: CategoryCreatedAt,
        updatedAt: CategoryUpdatedAt,
        workspaceId: CategoryWorkspaceId,
    ) {
        super();

        this.id = id;
        this.label = label;
        this.slug = slug;
        this.description = description;
        this.banner = banner;
        this.position = position;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.workspaceId = workspaceId;
    }

    static create(
        label: string,
        description: string,
        banner: string | null,
        position: number,
        workspaceId: string,
    ): Category {
        return new Category(
            CategoryId.random(),
            new CategoryLabel(label),
            CategorySlug.fromRaw(label),
            new CategoryDescription(description),
            banner ? CategoryBanner.some(banner) : CategoryBanner.none(),
            new CategoryPosition(position),
            new CategoryIsActive(true),
            new CategoryCreatedAt(new Date()),
            new CategoryUpdatedAt(new Date()),
            new CategoryWorkspaceId(workspaceId),
        );
    }

    static fromPrimitives(primitives: CategoryPrimitives): Category {
        return new Category(
            new CategoryId(primitives.id),
            new CategoryLabel(primitives.label),
            new CategorySlug(primitives.slug),
            new CategoryDescription(primitives.description),
            new CategoryBanner(primitives.banner),
            new CategoryPosition(primitives.position),
            new CategoryIsActive(primitives.isActive),
            new CategoryCreatedAt(primitives.createdAt),
            new CategoryUpdatedAt(primitives.updatedAt),
            new CategoryWorkspaceId(primitives.workspaceId),
        );
    }

    getId(): CategoryId {
        return this.id;
    }

    getLabel(): CategoryLabel {
        return this.label;
    }

    getSlug(): CategorySlug {
        return this.slug;
    }

    getDescription(): CategoryDescription {
        return this.description;
    }

    getBanner(): CategoryBanner {
        return this.banner;
    }

    getPosition(): CategoryPosition {
        return this.position;
    }

    getIsActive(): CategoryIsActive {
        return this.isActive;
    }

    getCreatedAt(): CategoryCreatedAt {
        return this.createdAt;
    }

    getUpdatedAt(): CategoryUpdatedAt {
        return this.updatedAt;
    }

    getWorkspaceId(): CategoryWorkspaceId {
        return this.workspaceId;
    }

    toPrimitives(): CategoryPrimitives {
        return {
            id: this.id.value,
            label: this.label.value,
            slug: this.slug.value,
            description: this.description.value,
            banner: this.banner.value,
            position: this.position.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            workspaceId: this.workspaceId.value,
        };
    }

    private touch(): void {
        this.updatedAt = new CategoryUpdatedAt(new Date());
    }
}

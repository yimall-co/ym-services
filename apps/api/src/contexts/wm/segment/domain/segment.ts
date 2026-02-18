import { AggregateRoot } from 'shared/domain/aggregate-root';

import { SegmentId } from 'wm/shared/domain/segment-id';

import { SegmentName } from './value-object/segment-name';
import { SegmentSlug } from './value-object/segment-slug';
import { SegmentDescription } from './value-object/segment-description';
import { SegmentIsActive } from './value-object/segment-is-active';
import { SegmentCreatedAt } from './value-object/segment-created-at';
import { SegmentUpdatedAt } from './value-object/segment-updated-at';

export interface SegmentPrimitives {
    id: string;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class Segment extends AggregateRoot {
    readonly id: SegmentId;
    readonly name: SegmentName;
    readonly slug: SegmentSlug;
    readonly description: SegmentDescription;
    readonly isActive: SegmentIsActive;
    readonly createdAt: SegmentCreatedAt;
    readonly updatedAt: SegmentUpdatedAt;

    constructor(
        id: SegmentId,
        name: SegmentName,
        slug: SegmentSlug,
        description: SegmentDescription,
        isActive: SegmentIsActive,
        createdAt: SegmentCreatedAt,
        updatedAt: SegmentUpdatedAt,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromPrimitives(primitives: SegmentPrimitives): Segment {
        return new Segment(
            new SegmentId(primitives.id),
            new SegmentName(primitives.name),
            new SegmentSlug(primitives.slug),
            new SegmentDescription(primitives.description),
            new SegmentIsActive(primitives.isActive),
            new SegmentCreatedAt(primitives.createdAt),
            new SegmentUpdatedAt(primitives.updatedAt),
        );
    }

    toPrimitives(): SegmentPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            slug: this.slug.value,
            description: this.description.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
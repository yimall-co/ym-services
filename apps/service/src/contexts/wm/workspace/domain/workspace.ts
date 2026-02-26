import { AggregateRoot } from 'shared/domain/aggregate-root';

import { SegmentId } from 'wm/shared/domain/segment-id';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';

import { WorkspaceName } from './value-object/workspace-name';
import { WorkspaceSlug } from './value-object/workspace-slug';
import { WorkspaceDescription } from './value-object/workspace-description';
import { WorkspaceTin } from './value-object/workspace-tin';
import { WorkspaceIsVerified } from './value-object/workspace-is-verified';
import { WorkspaceCreatedAt } from './value-object/workspace-created-at';
import { WorkspaceUpdatedAt } from './value-object/workspace-updated-at';
import { WorkspaceOwnerId } from './value-object/workspace-owner-id';

export interface WorkspacePrimitves {
    id: string;
    name: string;
    slug: string;
    description: string;
    tin: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    segmentId: string;
    ownerId: string;
}

export class Workspace extends AggregateRoot {
    readonly id: WorkspaceId;
    readonly name: WorkspaceName;
    readonly slug: WorkspaceSlug;
    readonly description: WorkspaceDescription;
    readonly tin: WorkspaceTin;
    readonly isVerified: WorkspaceIsVerified;
    readonly createdAt: WorkspaceCreatedAt;
    readonly updatedAt: WorkspaceUpdatedAt;
    readonly segmentId: SegmentId;
    readonly ownerId: WorkspaceOwnerId;

    constructor(
        id: WorkspaceId,
        name: WorkspaceName,
        slug: WorkspaceSlug,
        description: WorkspaceDescription,
        tin: WorkspaceTin,
        isVerified: WorkspaceIsVerified,
        createdAt: WorkspaceCreatedAt,
        updatedAt: WorkspaceUpdatedAt,
        segmentId: SegmentId,
        ownerId: WorkspaceOwnerId,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.tin = tin;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.segmentId = segmentId;
        this.ownerId = ownerId;
    }

    static create(
        name: WorkspaceName,
        slug: WorkspaceSlug,
        description: WorkspaceDescription,
        tin: WorkspaceTin,
        segmentId: SegmentId,
        ownerId: WorkspaceOwnerId,
    ): Workspace {
        return new Workspace(
            WorkspaceId.random(),
            name,
            slug,
            description,
            tin,
            new WorkspaceIsVerified(false),
            new WorkspaceCreatedAt(new Date()),
            new WorkspaceUpdatedAt(new Date()),
            segmentId,
            ownerId,
        );
    }

    static fromPrimitives(primitives: WorkspacePrimitves): Workspace {
        return new Workspace(
            new WorkspaceId(primitives.id),
            new WorkspaceName(primitives.name),
            new WorkspaceSlug(primitives.slug),
            new WorkspaceDescription(primitives.description),
            new WorkspaceTin(primitives.tin),
            new WorkspaceIsVerified(primitives.isVerified),
            new WorkspaceCreatedAt(primitives.createdAt),
            new WorkspaceUpdatedAt(primitives.updatedAt),
            new SegmentId(primitives.segmentId),
            new WorkspaceOwnerId(primitives.ownerId),
        );
    }

    toPrimitives(): WorkspacePrimitves {
        return {
            id: this.id.value,
            name: this.name.value,
            slug: this.slug.value,
            description: this.description.value,
            tin: this.tin.value,
            isVerified: this.isVerified.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            segmentId: this.segmentId.value,
            ownerId: this.ownerId.value,
        };
    }
}

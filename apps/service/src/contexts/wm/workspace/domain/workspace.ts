import { AggregateRoot } from 'shared/domain/aggregate-root';

import { SegmentId } from 'wm/shared/domain/segment-id';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';

import { WorkspaceName } from './value-object/workspace-name';
import { WorkspaceSlug } from './value-object/workspace-slug';
import { WorkspaceDescription } from './value-object/workspace-description';
import { WorkspaceTin } from './value-object/workspace-tin';
import { WorkspaceIsVerified } from './value-object/workspace-is-verified';
import { WorkspaceIsActive } from './value-object/workspace-is-active';
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
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    segmentId: string;
    ownerId: string;
}

export class Workspace extends AggregateRoot {
    private readonly id: WorkspaceId;
    private name: WorkspaceName;
    private readonly slug: WorkspaceSlug;
    private description: WorkspaceDescription;
    private tin: WorkspaceTin;
    private isVerified: WorkspaceIsVerified;
    private isActive: WorkspaceIsActive;
    private createdAt: WorkspaceCreatedAt;
    private updatedAt: WorkspaceUpdatedAt;
    private segmentId: SegmentId;
    private ownerId: WorkspaceOwnerId;

    constructor(
        id: WorkspaceId,
        name: WorkspaceName,
        slug: WorkspaceSlug,
        description: WorkspaceDescription,
        tin: WorkspaceTin,
        isVerified: WorkspaceIsVerified,
        isActive: WorkspaceIsActive,
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
        this.isActive = isActive;
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
            new WorkspaceIsActive(true),
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
            new WorkspaceIsActive(primitives.isActive),
            new WorkspaceCreatedAt(primitives.createdAt),
            new WorkspaceUpdatedAt(primitives.updatedAt),
            new SegmentId(primitives.segmentId),
            new WorkspaceOwnerId(primitives.ownerId),
        );
    }

    changeName(newName: WorkspaceName): void {
        if (newName.isEmpty()) return;
        if (this.name.equals(newName)) return;

        this.name = newName;
        this.updatedAt = new WorkspaceUpdatedAt(new Date());
    }

    changeDescription(newDescription: WorkspaceDescription): void {
        if (newDescription.isEmpty()) return;
        if (this.description.equals(newDescription)) return;

        this.description = newDescription;
        // Optionally we can add domain events
        // or call existing events
    }

    verify(): void {
        this.isVerified = new WorkspaceIsVerified(true);
    }

    toPrimitives(): WorkspacePrimitves {
        return {
            id: this.id.value,
            name: this.name.value,
            slug: this.slug.value,
            description: this.description.value,
            tin: this.tin.value,
            isVerified: this.isVerified.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            segmentId: this.segmentId.value,
            ownerId: this.ownerId.value,
        };
    }
}

import { AggregateRoot } from 'shared/domain/aggregate-root';

import { SegmentId } from 'wm/shared/domain/segment-id';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';

import { WorkspaceName } from './value-object/workspace-name';
import { WorkspaceSlug } from './value-object/workspace-slug';
import { WorkspaceDescription } from './value-object/workspace-description';
import { WorkspaceTin } from './value-object/workspace-tin';
import { WorkspaceIsVerified } from './value-object/workspace-is-verified';
import { WorkspaceIsRemoved } from './value-object/workspace-is-removed';
import { WorkspaceIsActive } from './value-object/workspace-is-active';
import { WorkspaceCreatedAt } from './value-object/workspace-created-at';
import { WorkspaceUpdatedAt } from './value-object/workspace-updated-at';
import { WorkspaceOwnerId } from './value-object/workspace-owner-id';
import { WorkspaceVersion } from './value-object/workspace-version';

export interface WorkspacePrimitves {
    id: string;
    name: string;
    slug: string;
    description: string;
    tin: string;
    version: number;
    isVerified: boolean;
    isRemoved: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    segmentId: string;
    ownerId: string;
}

export class Workspace extends AggregateRoot<WorkspacePrimitves> {
    private readonly id: WorkspaceId;
    private name: WorkspaceName;
    private slug: WorkspaceSlug;
    private description: WorkspaceDescription;
    private tin: WorkspaceTin;
    private version: WorkspaceVersion;
    private isVerified: WorkspaceIsVerified;
    private isRemoved: WorkspaceIsRemoved;
    private isActive: WorkspaceIsActive;
    private readonly createdAt: WorkspaceCreatedAt;
    private updatedAt: WorkspaceUpdatedAt;
    private segmentId: SegmentId;
    private ownerId: WorkspaceOwnerId;

    constructor(
        id: WorkspaceId,
        name: WorkspaceName,
        slug: WorkspaceSlug,
        description: WorkspaceDescription,
        tin: WorkspaceTin,
        version: WorkspaceVersion,
        isVerified: WorkspaceIsVerified,
        isRemoved: WorkspaceIsRemoved,
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
        this.version = version;
        this.isVerified = isVerified;
        this.isRemoved = isRemoved;
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
            new WorkspaceVersion(0),
            new WorkspaceIsVerified(false),
            new WorkspaceIsRemoved(false),
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
            new WorkspaceVersion(primitives.version),
            new WorkspaceIsVerified(primitives.isVerified),
            new WorkspaceIsRemoved(primitives.isRemoved),
            new WorkspaceIsActive(primitives.isActive),
            new WorkspaceCreatedAt(primitives.createdAt),
            new WorkspaceUpdatedAt(primitives.updatedAt),
            new SegmentId(primitives.segmentId),
            new WorkspaceOwnerId(primitives.ownerId),
        );
    }

    getId(): WorkspaceId {
        return this.id;
    }

    getName(): WorkspaceName {
        return this.name;
    }

    getSlug(): WorkspaceSlug {
        return this.slug;
    }

    getDescription(): WorkspaceDescription {
        return this.description;
    }

    getTin(): WorkspaceTin {
        return this.tin;
    }

    getOwnerId(): WorkspaceOwnerId {
        return this.ownerId;
    }

    getVersion(): WorkspaceVersion {
        return this.version;
    }

    changeName(newName: WorkspaceName): void {
        if (this.name.equals(newName)) {
            throw new Error('Workspace name already set');
        }

        this.name = newName;

        this.touch();
    }

    changeDescription(newDescription: WorkspaceDescription): void {
        if (newDescription.isEmpty()) {
            throw new Error('Workspace description is invalid');
        }

        if (this.description.equals(newDescription)) {
            throw new Error('Workspace description already set');
        }

        this.description = newDescription;
        // Optionally we can add domain events
        // or call existing events

        this.touch();
    }

    changeTin(newTin: WorkspaceTin): void {
        if (this.isVerified.value) {
            throw new Error('Verified workspace cannot change tin');
        }

        this.tin = newTin;

        this.touch();
    }

    verify(): void {
        if (!this.isActive.value) {
            throw new Error('Inactive workspace cannot be verified');
        }

        if (this.isVerified.value) return;

        this.isVerified = new WorkspaceIsVerified(true);

        this.touch();
    }

    inactive(ownerId: WorkspaceOwnerId): void {
        if (!this.isActive.value) return;

        if (this.ownerId.value !== ownerId.value) {
            throw new Error('You arent the Owner');
        }

        this.isActive = new WorkspaceIsActive(false);

        this.touch();
    }

    toPrimitives(): WorkspacePrimitves {
        return {
            id: this.id.value,
            name: this.name.value,
            slug: this.slug.value,
            description: this.description.value,
            tin: this.tin.value,
            version: this.version.value,
            isVerified: this.isVerified.value,
            isRemoved: this.isRemoved.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            segmentId: this.segmentId.value,
            ownerId: this.ownerId.value,
        };
    }

    private touch(): void {
        this.updatedAt = new WorkspaceUpdatedAt(new Date());
    }
}

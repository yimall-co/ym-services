import { AggregateRoot } from 'shared/domain/aggregate-root';

import { PermissionId } from 'iam/shared/domain/permission-id';

import { PermissionName } from './value-object/permission-name';
import { PermissionCodeName } from './value-object/permission-code-name';
import { PermissionDescription } from './value-object/permission-description';
import { PermissionCreatedAt } from './value-object/permission-created-at';
import { PermissionUpdatedAt } from './value-object/permission-updated-at';
import { PermissionIsActive } from './value-object/permission-is-active';
import { PermissionIsRemoved } from './value-object/permission-is-removed';

export interface PermissionPrimitives {
    id: string;
    name: string;
    codeName: string;
    description: string;
    isActive: boolean;
    isRemoved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class Permission extends AggregateRoot<PermissionPrimitives> {
    private readonly id: PermissionId;
    private name: PermissionName;
    private codeName: PermissionCodeName;
    private description: PermissionDescription;
    private isActive: PermissionIsActive;
    private isRemoved: PermissionIsRemoved;
    private readonly createdAt: PermissionCreatedAt;
    private updatedAt: PermissionUpdatedAt;

    constructor(
        id: PermissionId,
        name: PermissionName,
        codeName: PermissionCodeName,
        description: PermissionDescription,
        isActive: PermissionIsActive,
        isRemoved: PermissionIsRemoved,
        createdAt: PermissionCreatedAt,
        updatedAt: PermissionUpdatedAt,
    ) {
        super();
        this.id = id;
        this.name = name;
        this.codeName = codeName;
        this.description = description;
        this.isActive = isActive;
        this.isRemoved = isRemoved;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static create(
        name: PermissionName,
        codeName: PermissionCodeName,
        description: PermissionDescription,
        isActive: PermissionIsActive,
    ): Permission {
        return new Permission(
            PermissionId.random(),
            name,
            codeName,
            description,
            isActive,
            new PermissionIsRemoved(false),
            new PermissionCreatedAt(new Date()),
            new PermissionUpdatedAt(new Date()),
        );
    }

    static fromPrimitives(primitives: PermissionPrimitives): Permission {
        return new Permission(
            new PermissionId(primitives.id),
            new PermissionName(primitives.name),
            new PermissionCodeName(primitives.codeName),
            new PermissionDescription(primitives.description),
            new PermissionIsActive(primitives.isActive),
            new PermissionIsRemoved(primitives.isRemoved),
            new PermissionCreatedAt(primitives.createdAt),
            new PermissionUpdatedAt(primitives.updatedAt),
        );
    }

    getId(): PermissionId {
        return this.id;
    }

    getName(): PermissionName {
        return this.name;
    }

    getCodeName(): PermissionCodeName {
        return this.codeName;
    }

    toPrimitives(): PermissionPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            codeName: this.codeName.value,
            description: this.description.value,
            isActive: this.isActive.value,
            isRemoved: this.isRemoved.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }

    private touch(): void {
        this.updatedAt = new PermissionUpdatedAt(new Date());
    }
}

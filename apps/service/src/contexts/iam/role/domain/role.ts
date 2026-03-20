import { AggregateRoot } from 'shared/domain/aggregate-root';

import { RoleId } from 'iam/shared/domain/role-id';
import { PermissionId } from 'iam/shared/domain/permission-id';

import { RoleName } from './value-object/role-name';
import { RoleCodeName } from './value-object/role-code-name';
import { RoleDescription } from './value-object/role-description';
import { RoleVersion } from './value-object/role-version';
import { RoleIsActive } from './value-object/role-is-active';
import { RoleIsRemoved } from './value-object/role-is-removed';
import { RoleCreatedAt } from './value-object/role-created-at';
import { RoleUpdatedAt } from './value-object/role-updated-at';

export interface RolePrimitives {
    id: string;
    name: string;
    codeName: string;
    description: string;
    version: number;
    isActive: boolean;
    isRemoved: boolean;
    createdAt: Date;
    updatedAt: Date;
    permissions: Array<string>;
}

export class Role extends AggregateRoot<RolePrimitives> {
    private readonly id: RoleId;
    private name: RoleName;
    private codeName: RoleCodeName;
    private description: RoleDescription;
    private version: RoleVersion;
    private isActive: RoleIsActive;
    private isRemoved: RoleIsRemoved;
    private readonly createdAt: RoleCreatedAt;
    private updatedAt: RoleUpdatedAt;
    private permissions: Array<PermissionId>;

    constructor(
        id: RoleId,
        name: RoleName,
        codeName: RoleCodeName,
        description: RoleDescription,
        version: RoleVersion,
        isActive: RoleIsActive,
        isRemoved: RoleIsRemoved,
        createdAt: RoleCreatedAt,
        updatedAt: RoleUpdatedAt,
        permissions: Array<PermissionId>,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.codeName = codeName;
        this.description = description;
        this.version = version;
        this.isActive = isActive;
        this.isRemoved = isRemoved;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.permissions = permissions;
    }

    static create(
        name: RoleName,
        codeName: RoleCodeName,
        description: RoleDescription,
        permissions: Array<PermissionId>,
    ): Role {
        return new Role(
            RoleId.random(),
            name,
            codeName,
            description,
            new RoleVersion(0),
            new RoleIsActive(true),
            new RoleIsRemoved(false),
            new RoleCreatedAt(new Date()),
            new RoleUpdatedAt(new Date()),
            permissions,
        );
    }

    static fromPrimitives(primitives: RolePrimitives): Role {
        return new Role(
            new RoleId(primitives.id),
            new RoleName(primitives.name),
            new RoleCodeName(primitives.codeName),
            new RoleDescription(primitives.description),
            new RoleVersion(primitives.version),
            new RoleIsActive(primitives.isActive),
            new RoleIsRemoved(primitives.isRemoved),
            new RoleCreatedAt(primitives.createdAt),
            new RoleUpdatedAt(primitives.updatedAt),
            primitives.permissions.map((permission) => new PermissionId(permission)),
        );
    }

    getId(): RoleId {
        return this.id;
    }

    getName(): RoleName {
        return this.name;
    }

    getCodeName(): RoleCodeName {
        return this.codeName;
    }

    getDescription(): RoleDescription {
        return this.description;
    }

    getVersion(): RoleVersion {
        return this.version;
    }

    getIsActive(): RoleIsActive {
        return this.isActive;
    }

    getIsRemoved(): RoleIsRemoved {
        return this.isRemoved;
    }

    getCreatedAt(): RoleCreatedAt {
        return this.createdAt;
    }

    getUpdatedAt(): RoleUpdatedAt {
        return this.updatedAt;
    }

    getPermissions(): Array<PermissionId> {
        return this.permissions;
    }

    changeName(name: RoleName): void {
        if (this.name.equals(name)) return;

        this.name = name;

        this.touch();
    }

    changeCodeName(codeName: RoleCodeName): void {
        if (this.codeName.equals(codeName)) return;

        this.codeName = codeName;

        this.touch();
    }

    changeDescription(description: RoleDescription): void {
        if (this.description.equals(description)) return;

        this.description = description;

        this.touch();
    }

    addPermission(permission: PermissionId): void {
        if (this.permissions.some((p) => p.equals(permission))) return;

        this.permissions.push(permission);

        this.touch();
    }

    removePermission(permission: PermissionId): void {
        this.permissions = this.permissions.filter((p) => !p.equals(permission));

        this.touch();
    }

    toPrimitives(): RolePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            codeName: this.codeName.value,
            description: this.description.value,
            version: this.version.value,
            isActive: this.isActive.value,
            isRemoved: this.isRemoved.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            permissions: this.permissions.map((permission) => permission.value),
        };
    }

    private touch(): void {
        this.updatedAt = new RoleUpdatedAt(new Date());
    }
}

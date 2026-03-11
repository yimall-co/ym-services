import { AggregateRoot } from 'shared/domain/aggregate-root';

import { RoleId } from 'iam/shared/domain/role-id';
import { PermissionId } from 'iam/shared/domain/permission-id';

import { RoleName } from './value-object/role-name';
import { RoleCodeName } from './value-object/role-code-name';
import { RoleDescription } from './value-object/role-description';
import { RoleCreatedAt } from './value-object/role-created-at';
import { RoleUpdatedAt } from './value-object/role-updated-at';

export interface RolePrimitives {
    id: string;
    name: string;
    codeName: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    permissions: Array<string>;
}

export class Role extends AggregateRoot<RolePrimitives> {
    private readonly id: RoleId;
    private name: RoleName;
    private codeName: RoleCodeName;
    private description: RoleDescription;
    private readonly createdAt: RoleCreatedAt;
    private updatedAt: RoleUpdatedAt;
    private permissions: Array<PermissionId>;

    constructor(
        id: RoleId,
        name: RoleName,
        codeName: RoleCodeName,
        description: RoleDescription,
        createdAt: RoleCreatedAt,
        updatedAt: RoleUpdatedAt,
        permissions: Array<PermissionId>,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.codeName = codeName;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.permissions = permissions;
    }

    static create(name: RoleName, codeName: RoleCodeName, description: RoleDescription): Role {
        return new Role(
            RoleId.random(),
            name,
            codeName,
            description,
            new RoleCreatedAt(new Date()),
            new RoleUpdatedAt(new Date()),
            [],
        );
    }

    static fromPrimitives(primitives: RolePrimitives): Role {
        return new Role(
            new RoleId(primitives.id),
            new RoleName(primitives.name),
            new RoleCodeName(primitives.codeName),
            new RoleDescription(primitives.description),
            new RoleCreatedAt(primitives.createdAt),
            new RoleUpdatedAt(primitives.updatedAt),
            primitives.permissions.map((permission) => new PermissionId(permission)),
        );
    }

    getId(): RoleId {
        return this.id;
    }

    addPermission(permission: PermissionId) {
        this.permissions.push(permission);
    }

    removePermission(permission: PermissionId) {
        this.permissions = this.permissions.filter((p) => !p.equals(permission));
    }

    toPrimitives(): RolePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            codeName: this.codeName.value,
            description: this.description.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            permissions: this.permissions.map((permission) => permission.value),
        };
    }

    private touch(): void {
        this.updatedAt = new RoleUpdatedAt(new Date());
    }
}

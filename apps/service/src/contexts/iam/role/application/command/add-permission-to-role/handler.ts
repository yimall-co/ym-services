/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { RoleId } from 'iam/shared/domain/role-id';
import { PermissionId } from 'iam/shared/domain/permission-id';

import { AddPermissionToRoleResultDto } from './dto';
import { AddPermissionToRoleCommand } from './command';
import { RoleRepositoryScope } from '../../role.repository-scope';

export class AddPermissionToRoleCommandHandler implements CommandHandler<
    AddPermissionToRoleCommand,
    AddPermissionToRoleResultDto
> {
    constructor(private readonly uwo: UnitOfWork<RoleRepositoryScope>) { }

    subscribedTo(): Command {
        return AddPermissionToRoleCommand;
    }

    async handle(command: AddPermissionToRoleCommand): Promise<AddPermissionToRoleResultDto> {
        const roleId = new RoleId(command.roleId);
        const permissionId = new PermissionId(command.permissionId);

        return this.uwo.withTransaction(async (scope) => {
            const roleRepository = scope.getRoleRepository();
            const permissionRepository = scope.getPermissionRepository();

            const role = await roleRepository.findById(roleId);
            const existsPermissionById = await permissionRepository.existsActiveById(permissionId);
            if (!existsPermissionById) {
                throw new Error('Permission not found');
            }

            role.addPermission(permissionId);

            await roleRepository.save(role);

            return {
                roleId: roleId.value,
                permissionId: permissionId.value,
            };
        });
    }
}

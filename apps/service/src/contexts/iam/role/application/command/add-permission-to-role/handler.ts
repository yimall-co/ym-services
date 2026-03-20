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

        return this.uwo.withTransaction(async (repos) => {
            const roleRepository = repos.getRoleRepository();
            const permissionRepository = repos.getPermissionRepository();

            const role = await roleRepository.findById(roleId);
            await permissionRepository.existsActiveById(permissionId);

            role.addPermission(permissionId);

            await roleRepository.save(role);

            return {
                roleId: roleId.value,
                permissionId: permissionId.value,
            };
        });
    }
}

import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Role } from 'iam/role/domain/role';
import { RoleName } from 'iam/role/domain/value-object/role-name';
import { RoleCodeName } from 'iam/role/domain/value-object/role-code-name';
import { RoleDescription } from 'iam/role/domain/value-object/role-description';
import { PermissionId } from 'iam/shared/domain/permission-id';

import { CreateRoleResultDto } from './dto';
import { CreateRoleCommand } from './command';
import { RoleRepositoryScope } from '../../role.repository-scope';

export class CreateRoleCommandHandler implements CommandHandler<
    CreateRoleCommand,
    CreateRoleResultDto
> {
    constructor(private readonly uwo: UnitOfWork<RoleRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateRoleCommand;
    }

    async handle(command: CreateRoleCommand): Promise<CreateRoleResultDto> {
        const role = Role.create(
            new RoleName(command.name),
            new RoleCodeName(command.codeName),
            new RoleDescription(command.description ?? ''),
            command.permissions?.map((permission) => new PermissionId(permission)) ?? [],
        );

        return this.uwo.withTransaction(async (repos) => {
            const roleRepository = repos.getRoleRepository();

            await roleRepository.save(role);

            return {
                roleId: role.getId().value,
            };
        });
    }
}

import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { RoleId } from 'iam/shared/domain/role-id';
import { RoleName } from 'iam/role/domain/value-object/role-name';
import { RoleCodeName } from 'iam/role/domain/value-object/role-code-name';
import { RoleDescription } from 'iam/role/domain/value-object/role-description';

import { UpdateRoleResultDto } from './dto';
import { UpdateRoleCommand } from './command';
import { RoleRepositoryScope } from '../../role.repository-scope';

export class UpdateRoleCommandHandler implements CommandHandler<
    UpdateRoleCommand,
    UpdateRoleResultDto
> {
    constructor(private readonly uwo: UnitOfWork<RoleRepositoryScope>) { }

    subscribedTo(): Command {
        return UpdateRoleCommand;
    }

    async handle(command: UpdateRoleCommand): Promise<UpdateRoleResultDto> {
        const roleId = new RoleId(command.id);

        return this.uwo.withTransaction(async (repos) => {
            const roleRepository = repos.getRoleRepository();

            const role = await roleRepository.findById(roleId);

            role.changeName(new RoleName(command.name));
            role.changeCodeName(new RoleCodeName(command.codeName));
            role.changeDescription(new RoleDescription(command.description));

            await roleRepository.save(role);

            return {
                roleId: roleId.value,
            };
        });
    }
}

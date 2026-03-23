/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { UserId } from 'iam/shared/domain/user-id';
import { RoleId } from 'iam/shared/domain/role-id';

import { AddRoleToUserCommand } from './command';
import { AddRoleToUserResultDto } from './dto';
import { UserRepositoryScope } from '../../user.repository-scope';

export class AddRoleToUserCommandHandler implements CommandHandler<
    AddRoleToUserCommand,
    AddRoleToUserResultDto
> {
    constructor(private readonly uow: UnitOfWork<UserRepositoryScope>) { }

    subscribedTo(): Command {
        return AddRoleToUserCommand;
    }

    async handle(command: AddRoleToUserCommand): Promise<AddRoleToUserResultDto> {
        const userId = new UserId(command.userId);
        const roleId = new RoleId(command.roleId);

        return this.uow.withTransaction(async (scope) => {
            const userRepository = scope.getUserRepository();
            const roleRepository = scope.getRoleRepository();

            const user = await userRepository.findById(userId);
            const existsRoleById = await roleRepository.existsActiveById(roleId);
            if (!existsRoleById) {
                throw new Error('Role not found');
            }

            user.addRole(roleId);

            await userRepository.save(user);

            return {
                userId: userId.value,
                roleId: roleId.value,
            };
        });
    }
}

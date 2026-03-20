/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Permission } from 'iam/permission/domain/permission';
import { PermissionName } from 'iam/permission/domain/value-object/permission-name';
import { PermissionCodeName } from 'iam/permission/domain/value-object/permission-code-name';
import { PermissionDescription } from 'iam/permission/domain/value-object/permission-description';
import { PermissionIsActive } from 'iam/permission/domain/value-object/permission-is-active';

import { CreatePermissionCommand } from './command';
import { CreatePermissionResultDto } from './dto';
import { PermissionRepositoryScope } from '../../permission.repository-scope';

export class CreatePermissionCommandHandler implements CommandHandler<
    CreatePermissionCommand,
    CreatePermissionResultDto
> {
    constructor(private readonly uow: UnitOfWork<PermissionRepositoryScope>) { }

    subscribedTo(): Command {
        return CreatePermissionCommand;
    }

    async handle(command: CreatePermissionCommand): Promise<CreatePermissionResultDto> {
        const permission = Permission.create(
            new PermissionName(command.name),
            new PermissionCodeName(command.codeName),
            new PermissionDescription(command.description ?? ''),
            new PermissionIsActive(command.isActive ?? true),
        );

        return this.uow.withTransaction(async (scope) => {
            const permissionRepository = scope.getPermissionRepository();

            const existsByCodeName = await permissionRepository.existsActiveByCodeName(permission.getCodeName());
            if (existsByCodeName) {
                throw new Error('Permission already exists');
            }

            await permissionRepository.save(permission);

            const permissionId = permission.getId();

            return {
                permissionId: permissionId.value,
            };
        });
    }
}

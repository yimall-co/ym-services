import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Category } from 'core/sales/category/domain/category';
import { CategoryAlreadyExists } from 'core/sales/category/domain/error/category-already-exists';

import { CreateCategoryCommand } from './command';
import { CreateCategoryResultDto } from './dto';
import { CategoryRepositoryScope } from '../../category.repository-scope';

export class CreateCategoryCommandHandler implements CommandHandler<
    CreateCategoryCommand,
    CreateCategoryResultDto
> {
    constructor(private readonly uow: UnitOfWork<CategoryRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateCategoryCommand;
    }

    async handle(command: CreateCategoryCommand): Promise<CreateCategoryResultDto> {
        const category = Category.create(
            command.label,
            command.description ?? '',
            command.banner,
            command.position ?? 0,
            command.workspaceId,
        );

        return this.uow.withTransaction(async (scope) => {
            const categoryRepository = scope.getCategoryRepository();

            const existsSlugInWorkspace = await categoryRepository.existsBySlugAndWorkspace(
                category.getSlug(),
                category.getWorkspaceId(),
            );

            if (existsSlugInWorkspace) {
                throw new CategoryAlreadyExists();
            }

            await categoryRepository.save(category);

            return {
                categoryId: category.getId().value,
            };
        });
    }
}

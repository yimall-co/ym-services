import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Shop } from 'vm/shop/domain/shop';
import { ShopSlugAlreadyExists } from 'vm/shop/domain/error/shop-slug-already-exists';

import { CreateShopCommand } from './command';
import { CreateShopResultDto } from './dto';
import { ShopRepositoryScope } from '../../shop.repository-scope';

export class CreateShopCommandHandler implements CommandHandler<
    CreateShopCommand,
    CreateShopResultDto
> {
    constructor(private readonly uow: UnitOfWork<ShopRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateShopCommand;
    }

    async handle(command: CreateShopCommand): Promise<CreateShopResultDto> {
        const shop = Shop.create(
            command.name,
            command.description ?? '',
            command.banner ?? '',
            command.phone,
            command.isPrimary,
            command.workspaceId,
        );

        return this.uow.withTransaction(async (scope) => {
            const shopRepository = scope.getShopRepository();

            const slug = shop.getSlug().value;

            const existsBySlug = await shopRepository.existsBySlug(slug);
            if (existsBySlug) {
                throw new ShopSlugAlreadyExists(slug);
            }

            const workspaceId = shop.getWorkspaceId().value;
            const alreadyExistsPrimaryInWorkspace =
                await shopRepository.alreadyHasPrimaryShop(workspaceId);
            // Just can exits one primary shop in a workspace
            if (alreadyExistsPrimaryInWorkspace) {
                shop.unmarkAsPrimary();
            }

            await shopRepository.save(shop);

            return {
                shopId: shop.getId().value,
            };
        });
    }
}

import { CacheInterceptor } from "@nestjs/cache-manager";
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';
import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "presentation/shared/guards/jwt-auth.guard";
import { AddMemberToWorkspaceDto } from "./dtos/add-member-to-workspace.dto";
import { AddMemberToWorkspaceCommand } from "wm/workspace-member/application/command/add-member-to-workspace/command";
import { AddMemberToWorkspaceResultDto } from "wm/workspace-member/application/command/add-member-to-workspace/dto";

@Controller({
    path: 'workspaces/:workspaceId/members',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class WorkspaceMemberController {
    private readonly logger = new Logger(WorkspaceMemberController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Post("/add")
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Member added to workspace successfully' })
    @HttpCode(HttpStatus.OK)
    async addMemberToWorkspace(@Body() addMemberToWorkspaceDto: AddMemberToWorkspaceDto) {
        const { workspaceId, userId, roleId } = addMemberToWorkspaceDto;

        const command = new AddMemberToWorkspaceCommand(workspaceId, userId, roleId);

        try {
            return await this.commandBus.dispatch<AddMemberToWorkspaceResultDto>(command);
        } catch (error) {
            this.logger.error(`Failed to add member to workspace: ${error.message}`, error.stack);
            throw new BadRequestException();
        }

    }
}

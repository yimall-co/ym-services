import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class AddMemberToWorkspaceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4')
    workspaceId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4')
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4')
    roleId: string;
}
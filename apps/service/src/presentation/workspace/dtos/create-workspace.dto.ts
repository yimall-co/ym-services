import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWorkspaceDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsAlphanumeric()
    tin: string | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    segmentId: string;

    @ApiProperty()
    @IsNotEmpty()
    ownerId: string;
}

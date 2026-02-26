import { IsAlphanumeric, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWorkspaceDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsAlphanumeric()
    tin: string | null;

    @IsNotEmpty()
    @IsUUID()
    segmentId: string;

    @IsNotEmpty()
    ownerId: string;
}

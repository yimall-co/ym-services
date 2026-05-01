import { IsAlphanumeric, IsOptional } from 'class-validator';

export class UpdateWorkspaceDto {
    @IsAlphanumeric()
    @IsOptional()
    name: string;

    @IsOptional()
    description: string;
}

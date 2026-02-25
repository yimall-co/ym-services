import { Workspace, WorkspacePrimitves } from 'wm/workspace/domain/workspace';

export class WorkspaceResult implements WorkspacePrimitves {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly description: string;
    readonly tin: string;
    readonly isVerified: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly segmentId: string;
    readonly ownerId: string;

    constructor(workspace: Workspace) {
        const primitives = workspace.toPrimitives();

        this.id = primitives.id;
        this.name = primitives.name;
        this.slug = primitives.slug;
        this.description = primitives.description;
        this.tin = primitives.tin;
        this.isVerified = primitives.isVerified;
        this.createdAt = primitives.createdAt;
        this.updatedAt = primitives.updatedAt;
        this.segmentId = primitives.segmentId;
        this.ownerId = primitives.ownerId;
    }
}

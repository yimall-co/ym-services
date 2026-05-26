import { AggregateRoot } from 'shared/domain/aggregate-root';

import { Uuid } from 'shared/domain/value-object/uuid';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';

import { CampaignStatuses } from './enum/campaign-statuses';
import { CampaignTypes } from './enum/campaign-types';
import { CampaignName } from './value-object/campaign-name';
import { CampaignCode } from './value-object/campaign-code';
import { CampaignDescription } from './value-object/campaign-description';
import { CampaignType } from './value-object/campaign-type';
import { CampaignStatus } from './value-object/campaign-status';
import { CampaignPublicationPeriod } from './value-object/campaign-publication-period';
import { CampaignPriority } from './value-object/campaign-priority';
import { CampaignIsActive } from './value-object/campaign-is-active';

export interface CampaignPrimitives {
    id: string;
    name: string;
    code: string;
    description: string;
    type: CampaignTypes;
    status: CampaignStatuses;
    publicationPeriod: {
        startDate: Date;
        endDate: Date;
    };
    priority: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
}

export class Campaign extends AggregateRoot<CampaignPrimitives> {
    private readonly id: Uuid;
    private name: CampaignName;
    private code: CampaignCode;
    private description: CampaignDescription;
    private type: CampaignType;
    private status: CampaignStatus;
    private publicationPeriod: CampaignPublicationPeriod;
    private priority: CampaignPriority;
    private isActive: CampaignIsActive;
    private readonly createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private readonly workspaceId: Uuid;

    constructor(
        id: Uuid,
        name: CampaignName,
        code: CampaignCode,
        description: CampaignDescription,
        type: CampaignType,
        status: CampaignStatus,
        publicationPeriod: CampaignPublicationPeriod,
        priority: CampaignPriority,
        isActive: CampaignIsActive,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        workspaceId: Uuid,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.type = type;
        this.status = status;
        this.publicationPeriod = publicationPeriod;
        this.priority = priority;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.workspaceId = workspaceId;
    }

    static create(
        name: string,
        code: string,
        type: CampaignTypes,
        status: CampaignStatuses,
        startDate: Date,
        endDate: Date,
        workspaceId: string,
        priority?: number,
        description?: string,
    ): Campaign {
        return new Campaign(
            Uuid.random(),
            new CampaignName(name),
            new CampaignCode(code),
            new CampaignDescription(description ?? ''),
            new CampaignType(type),
            new CampaignStatus(status),
            CampaignPublicationPeriod.create(startDate, endDate),
            new CampaignPriority(priority ?? 0),
            new CampaignIsActive(true),
            new CreatedAt(new Date()),
            new UpdatedAt(new Date()),
            new Uuid(workspaceId),
        );
    }

    static fromPrimitives(primitives: CampaignPrimitives): Campaign {
        return new Campaign(
            new Uuid(primitives.id),
            new CampaignName(primitives.name),
            new CampaignCode(primitives.code),
            new CampaignDescription(primitives.description),
            new CampaignType(primitives.type),
            new CampaignStatus(primitives.status),
            CampaignPublicationPeriod.create(
                primitives.publicationPeriod.startDate,
                primitives.publicationPeriod.endDate,
            ),
            new CampaignPriority(primitives.priority),
            new CampaignIsActive(primitives.isActive),
            new CreatedAt(primitives.createdAt),
            new UpdatedAt(primitives.updatedAt),
            new Uuid(primitives.workspaceId),
        );
    }

    getId(): Uuid {
        return this.id;
    }

    toPrimitives(): CampaignPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            code: this.code.value,
            description: this.description.value,
            type: this.type.value,
            status: this.status.value,
            publicationPeriod: {
                startDate: this.publicationPeriod.startDate,
                endDate: this.publicationPeriod.endDate,
            },
            priority: this.priority.valueOf(),
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            workspaceId: this.workspaceId.value,
        };
    }
}

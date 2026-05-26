import { Uuid } from 'shared/domain/value-object/uuid';
import { AggregateRoot } from 'shared/domain/aggregate-root';

import { UserName } from './value-object/user-name';
import { UserEmail } from './value-object/user-email';
import { UserEmailVerified } from './value-object/user-email-verified';
import { UserImage } from './value-object/user-image';
import { UserIsActive } from './value-object/user-is-active';
import { UserIsRemoved } from './value-object/user-is-removed';
import { UserCreatedAt } from './value-object/user-created-at';
import { UserUpdatedAt } from './value-object/user-updated-at';
import { UserCreatedEvent } from './event/user-created.event';

export interface UserPrimitives {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    isActive: boolean;
    isRemoved: boolean;
    createdAt: Date;
    updatedAt: Date;
    roles: Array<string>;
}

export class User extends AggregateRoot<UserPrimitives> {
    private readonly id: Uuid;
    private name: UserName;
    private email: UserEmail;
    private emailVerified: UserEmailVerified;
    private image: UserImage;
    private isActive: UserIsActive;
    private isRemoved: UserIsRemoved;
    private readonly createdAt: UserCreatedAt;
    private updatedAt: UserUpdatedAt;
    private roles: Array<Uuid>;

    constructor(
        id: Uuid,
        name: UserName,
        email: UserEmail,
        emailVerified: UserEmailVerified,
        image: UserImage,
        isActive: UserIsActive,
        isRemoved: UserIsRemoved,
        createdAt: UserCreatedAt,
        updatedAt: UserUpdatedAt,
        roles: Array<Uuid>,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.email = email;
        this.emailVerified = emailVerified;
        this.image = image;
        this.isActive = isActive;
        this.isRemoved = isRemoved;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.roles = roles;
    }

    static create(name: UserName, email: UserEmail, roles: Array<Uuid>, image: UserImage): User {
        const user = new User(
            Uuid.random(),
            name,
            email,
            new UserEmailVerified(false),
            image,
            new UserIsActive(true),
            new UserIsRemoved(false),
            new UserCreatedAt(new Date()),
            new UserUpdatedAt(new Date()),
            roles,
        );

        user.record(
            new UserCreatedEvent({
                name: user.getName().value,
                email: user.getEmail().value,
                image: user.getImage().value,
                aggregateId: user.getId().value,
            }),
        );

        return user;
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(
            new Uuid(primitives.id),
            new UserName(primitives.name),
            new UserEmail(primitives.email),
            new UserEmailVerified(primitives.emailVerified),
            new UserImage(primitives.image),
            new UserIsActive(primitives.isActive),
            new UserIsRemoved(primitives.isRemoved),
            new UserCreatedAt(primitives.createdAt),
            new UserUpdatedAt(primitives.updatedAt),
            primitives.roles.map((role) => new Uuid(role)),
        );
    }

    getId(): Uuid {
        return this.id;
    }

    getName(): UserName {
        return this.name;
    }

    getEmail(): UserEmail {
        return this.email;
    }

    getEmailVerified(): UserEmailVerified {
        return this.emailVerified;
    }

    getImage(): UserImage {
        return this.image;
    }

    getRoles(): Array<Uuid> {
        return this.roles;
    }

    addRole(role: Uuid): void {
        if (this.roles.some((r) => r.equals(role))) return;

        this.roles.push(role);

        this.touch();
    }

    removeRole(role: Uuid): void {
        this.roles = this.roles.filter((r) => !r.equals(role));

        this.touch();
    }

    verifyEmail(): void {
        if (this.emailVerified.value) return;

        this.emailVerified = new UserEmailVerified(true);

        this.touch();
    }

    toPrimitives(): UserPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            emailVerified: this.emailVerified.value,
            image: this.image.value,
            isActive: this.isActive.value,
            isRemoved: this.isRemoved.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            roles: this.roles.map((role) => role.value),
        };
    }

    private touch(): void {
        this.updatedAt = new UserUpdatedAt(new Date());
    }
}

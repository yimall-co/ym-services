import { AggregateRoot } from 'shared/domain/aggregate-root';

import { UserId } from 'iam/shared/domain/user-id';
import { RoleId } from 'iam/shared/domain/role-id';

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
    private readonly id: UserId;
    private name: UserName;
    private email: UserEmail;
    private emailVerified: UserEmailVerified;
    private image: UserImage;
    private isActive: UserIsActive;
    private isRemoved: UserIsRemoved;
    private readonly createdAt: UserCreatedAt;
    private updatedAt: UserUpdatedAt;
    private roles: Array<RoleId>;

    constructor(
        id: UserId,
        name: UserName,
        email: UserEmail,
        emailVerified: UserEmailVerified,
        image: UserImage,
        isActive: UserIsActive,
        isRemoved: UserIsRemoved,
        createdAt: UserCreatedAt,
        updatedAt: UserUpdatedAt,
        roles: Array<RoleId>,
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

    static create(name: UserName, email: UserEmail, image: UserImage, roles: Array<RoleId>): User {
        const user = new User(
            UserId.random(),
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
                name: name.value,
                email: email.value,
                image: image.value,
                aggregateId: user.id.value,
            }),
        );

        return user;
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(
            new UserId(primitives.id),
            new UserName(primitives.name),
            new UserEmail(primitives.email),
            new UserEmailVerified(primitives.emailVerified),
            new UserImage(primitives.image),
            new UserIsActive(primitives.isActive),
            new UserIsRemoved(primitives.isRemoved),
            new UserCreatedAt(primitives.createdAt),
            new UserUpdatedAt(primitives.updatedAt),
            primitives.roles.map((role) => new RoleId(role)),
        );
    }

    getId(): UserId {
        return this.id;
    }

    getName(): UserName {
        return this.name;
    }

    getEmail(): UserEmail {
        return this.email;
    }

    getRoles(): Array<RoleId> {
        return this.roles;
    }

    addRole(role: RoleId): void {
        if (this.roles.some((r) => r.equals(role))) return;

        this.roles.push(role);

        this.touch();
    }

    removeRole(role: RoleId): void {
        this.roles = this.roles.filter((r) => !r.equals(role));

        this.touch();
    }

    verify(): void {
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

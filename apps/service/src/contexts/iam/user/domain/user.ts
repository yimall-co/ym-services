import { AggregateRoot } from 'shared/domain/aggregate-root';

import { UserId } from 'iam/shared/domain/user-id';

import { UserName } from './value-object/user-name';
import { UserEmail } from './value-object/user-email';
import { UserEmailVerified } from './value-object/user-email-verified';
import { UserImage } from './value-object/user-image';
import { UserCreatedAt } from './value-object/user-created-at';
import { UserUpdatedAt } from './value-object/user-updated-at';

export interface UserPrimitives {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User extends AggregateRoot<UserPrimitives> {
    private readonly id: UserId;
    private name: UserName;
    private email: UserEmail;
    private emailVerified: UserEmailVerified;
    private image: UserImage;
    private readonly createdAt: UserCreatedAt;
    private updatedAt: UserUpdatedAt;

    constructor(
        id: UserId,
        name: UserName,
        email: UserEmail,
        emailVerified: UserEmailVerified,
        image: UserImage,
        createdAt: UserCreatedAt,
        updatedAt: UserUpdatedAt,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.email = email;
        this.emailVerified = emailVerified;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static create(name: UserName, email: UserEmail, image: UserImage): User {
        return new User(
            UserId.random(),
            name,
            email,
            new UserEmailVerified(false),
            image,
            new UserCreatedAt(new Date()),
            new UserUpdatedAt(new Date()),
        );
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(
            new UserId(primitives.id),
            new UserName(primitives.name),
            new UserEmail(primitives.email),
            new UserEmailVerified(primitives.emailVerified),
            new UserImage(primitives.image),
            new UserCreatedAt(primitives.createdAt),
            new UserUpdatedAt(primitives.updatedAt),
        );
    }

    getId(): UserId {
        return this.id;
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
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }

    private touch(): void {
        this.updatedAt = new UserUpdatedAt(new Date());
    }
}

import argon2 from 'argon2';

import { PasswordService } from 'core/iam/account/domain/service/password.service';

export class Argon2PasswordService implements PasswordService {
    private readonly SALT_ROUNDS = 16;

    hash(plain: string): Promise<string> {
        return argon2.hash(plain, {
            hashLength: this.SALT_ROUNDS,
        });
    }

    compare(plain: string, hash: string): Promise<boolean> {
        return argon2.verify(hash, plain);
    }
}

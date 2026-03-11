import { hash as baseHash, verify as baseVerify } from 'argon2';

export async function hash(plain: string, salt: number = 32): Promise<string> {
    const hash = await baseHash(plain, {
        hashLength: salt,
    });
    return hash;
}

export async function verify(hashed: string, plain: string): Promise<boolean> {
    const verified = await baseVerify(hashed, plain);
    return verified;
}

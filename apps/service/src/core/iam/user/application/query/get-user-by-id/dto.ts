export interface UserByIdDto {
    id: string;
    name: string;
    image: string | null;
    email: string;
    emailVerified: boolean;
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            algorithms: ['RS256', 'RS384', 'RS512', 'HS256', 'HS384', 'HS512'],
            secretOrKey: configService.getOrThrow<string>('jwt.accessPublicKey'),
        });
    }

    validate(payload: any) {
        return { userId: payload.sub, userEmail: payload.email };
    }
}

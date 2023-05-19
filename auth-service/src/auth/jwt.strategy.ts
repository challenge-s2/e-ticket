import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {ExtractJwt} from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'I SWEAR TO GOD IF I SEE THIS IN A REAL PROJECT I WILL KILL YOU DO YOU UNDERSTAND???'
        });
    }

    async validate(payload) {
        return { id: payload.sub, user: payload.user};
    }
}

import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
    constructor(
        private prismaService : PrismaService,
        private jwt : JwtService,
        private config : ConfigService
        ){}
    test(str:string) {
        return str;
    }
    async login(req : AuthDto){
        const hash = await argon2.hash(req.password.toString());
        const user= await this.prismaService.user.findUnique({
            where: {
                email: req.email.toString(),
            },
        })
        if(!user){
            throw new ForbiddenException(
                'User not found'
            );
        }
        const match = await argon2.verify(
            user.hash,
            req.password.toString()
        )
        if(match){
            const payload = {userID : user.id, email : user.email}
            const accessToken = await this.jwt.signAsync(
                payload,{
                    expiresIn: '20m',
                    secret: this.config.get('SECRET')
                }
            )
            return {token : accessToken}
        }
        else{
            throw new ForbiddenException(
                'Incorrect Credentials'
            );
        }
        
        
    }
    async signup(req : AuthDto){
        const hash = await argon2.hash(req.password.toString());
        try{
        const user = await this.prismaService.user.create({
            data : {
                email : req.email.toString(),
                hash:hash,
            }
        })
        return user.email;
    }
    catch(err){
        return err;
    }
    }
}
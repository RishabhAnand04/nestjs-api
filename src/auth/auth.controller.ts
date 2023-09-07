import { Body, Controller, Post,UseGuards, Get, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController{
    constructor( private authService : AuthService){
        this.authService.test("hello");
    }

    @Post('signup')
    signup(@Body() req : AuthDto){
        return this.authService.signup(req);
    }   

    @Post('login')
    login(@Body() req : AuthDto){
        return this.authService.login(req);
    }

} 
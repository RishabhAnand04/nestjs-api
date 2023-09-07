import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email : String;

    @IsString()
    @IsNotEmpty()
    password : String;

}
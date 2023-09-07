import { Controller, Get, UseGuards , Request, Patch, Body} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@Controller('user')
export class UserController {
    constructor(private userService : UserService){}
    @UseGuards(AuthGuard)
    @Get('getUser')
    getUser(@Request() req){
        return this.userService.getUser(req);
    }

    @UseGuards(AuthGuard)
    @Patch('editUser')
    async editUser(@Request() req, @Body() dto: EditUserDto){
        const user= await this.userService.getUser(req);
        return this.userService.editUser(user.userID , dto);
    }
}

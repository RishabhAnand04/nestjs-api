import { Controller, Delete, Get, Patch, UseGuards, Post, Request, Param, ParseIntPipe, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { BookmarkService } from './bookmark.service';

@UseGuards(AuthGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private userService : UserService,private bookmarkService: BookmarkService,){}

    @Get()
    async getBookmarks(@Request() req){
        const user = await this.userService.getUser(req);
        return this.bookmarkService.getBookmarks(user.userID);
    }

    @Get(':id')
    async getBookmarkById(
        @Request() req,
        @Param('id' , ParseIntPipe) bookmarkId : number){
        const user = await this.userService.getUser(req);
        return this.bookmarkService.getBookmarkById(user.userID,bookmarkId );
    }

    @Patch(':id')
    async editBookmarkById(
        @Request() req,
        @Param('id' , ParseIntPipe) bookmarkId : number,
        @Body() dto : EditBookmarkDto){
        const user = await this.userService.getUser(req);
        return this.bookmarkService.editBookmarkById(user.userID, bookmarkId, dto);
    }

    @Delete(':id')
    async deleteBookmarkById(
        @Request() req,
        @Param('id' , ParseIntPipe) bookmarkId : number){
        const user = await this.userService.getUser(req);
        return this.bookmarkService.deleteBookmarkById(user.userID, bookmarkId)
    }

    @Post()
    async createBookmark(
        @Request() req, @Body() dto: CreateBookmarkDto){
        const user = await this.userService.getUser(req);
        return this.bookmarkService.createBookmark(user.userID, dto);
    }
    
}

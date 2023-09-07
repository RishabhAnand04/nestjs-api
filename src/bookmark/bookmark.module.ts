import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports :[AuthModule, JwtModule.register({}), UserModule],
  providers: [BookmarkService, UserService],
  controllers: [BookmarkController]
})
export class BookmarkModule {}

import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { DbModule } from './db/db.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }
    ),
    AuthModule,
    UserModule,
    BookmarkModule, 
    DbModule, 
    PrismaModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

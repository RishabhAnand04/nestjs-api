import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';

@Module({
  imports : [AuthModule, JwtModule.register({}),],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

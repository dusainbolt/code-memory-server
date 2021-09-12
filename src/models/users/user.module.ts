import { AppLogger } from './../../logs/logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserSchema, USER_NAME } from './user.schema';
import { HashService } from 'src/hash/hash.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: USER_NAME, schema: UserSchema }])],
  providers: [UserService, UserResolver, HashService, AppLogger],
  exports: [UserService],
})
export class UsersModule {}

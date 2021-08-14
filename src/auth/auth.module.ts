import { RolesGuard } from './roles.guard';
import { UsersModule } from '../models/users/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { HashService } from 'src/hash/hash.service';

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    HashService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

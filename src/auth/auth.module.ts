import { RolesGuard } from './roles.guard';
import { UsersModule } from '../models/users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [UsersModule],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}

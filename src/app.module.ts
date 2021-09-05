import { TagService } from './models/tag/tag.service';
import { TagModule } from './models/tag/tag.module';
import { UsersModule } from './models/users/user.module';
import { PluginModule } from './plugins/plugin.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsModule } from './models/models.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LogsModule } from './logs/logs.module';
import { ConfigModule } from '@nestjs/config';
import { environment } from './environment';
import { HashModule } from './hash/hash.module';
import { UserService } from './models/users/user.service';
import { createUsersLoader } from './models/users/user.loader';
import { createTagsLoader } from './models/tag/tag.loader';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    PluginModule,
    ModelsModule,
    GraphQLModule.forRootAsync({
      imports: [UsersModule, TagModule],
      useFactory: (userService: UserService, tagService: TagService) => ({
        playground: process.env.NODE_ENV !== 'production',
        installSubscriptionHandlers: true,
        sortSchema: true,
        fieldResolverEnhancers: ['guards'],
        autoSchemaFile: 'schema.gql',
        cors: {
          origin: '*',
          credentials: true,
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          preflightContinue: true,
          optionsSuccessStatus: 204,
        },
        context: () => ({
          usersLoader: createUsersLoader(userService),
          tagsLoader: createTagsLoader(tagService),
        }),
      }),
      inject: [UserService, TagService],
    }),
    // TasksModule,
    LogsModule,
    AuthModule,
    HashModule,
  ],
})
export class AppModule { }

// ____Exception filter
// providers: [
//     {
//         provide: APP_FILTER,
//         useClass: AllExceptionFilter,
//     },
// ],

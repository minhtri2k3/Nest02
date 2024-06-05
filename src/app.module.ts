import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Personal } from './typeorm/entities/Personal';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'mysql',
      host :'localhost',
      port : 3306,
      username : 'root',
      password : 'root',
      database : 'nest',
      entities : [User , Personal],
      synchronize : false,
      // your TypeORM configuration options
      // You can also provide path to ormconfig.json here instead of providing configuration options explicitly
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Personal } from 'src/typeorm/entities/Personal';


@Module({
   imports : [TypeOrmModule.forFeature([User , Personal])], 
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {
    
}


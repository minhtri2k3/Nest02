import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dtos/CreateUser.dto';
import { UsersService } from './users/services/users/users.service';

@Controller('account')
export class AppController {
   constructor(
      private readonly appService: AppService
   ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  
  
  @Put()
  updateUser(){
     return 'lala';
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/typeorm/entities/User';
import { CreatePersonalDto } from 'src/users/dtos/CreatePersonal.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { PaginationDto } from 'src/users/dtos/pagination.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserParams } from 'src/utils/types';
@Controller('users')
export class UsersController {
    constructor (private userService : UsersService ){

    }
    // @Post('/post')
    // createUser(@Body() createUserDto : CreateUserDto){  
    //     return this.userService.createUser( createUserDto);
    // }
  
    @Get(':id')
    getUserById(@Param('id' , ParseIntPipe) id : number){
        return this.userService.findUserById(id);
    } 
  
    @Put(':id')
    async updateUserById(
        @Param('id' , ParseIntPipe) id : number,
        @Body() updateUserDto : UpdateUserDto,
    ){
       await this.userService.updateUser(id,updateUserDto);
         return this.userService.findUserById(id);
    }
    @Post(':id/personal')
    async createPersonalById(
        @Param('id' , ParseIntPipe) id : number,
        @Body() createPersonalDto : CreatePersonalDto,
    ){
         return this.userService.createPersonalById(id,createPersonalDto);
    }
    // @Get('/test')
    // public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    //   return this.userService.findAll(query)
    // }
    @Get()
    getUser(@Query()PaginationDto : PaginationDto){
        return this.userService.findAllUser(PaginationDto);
    }
    @Get('/paginate')
  async getPaginateValue(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 5,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate({
      page,
      limit,
      route: 'http://cats.com/cats',
    });
  }
 
}

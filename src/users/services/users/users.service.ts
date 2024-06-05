import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreatePersonalParams, CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/users/dtos/pagination.dto';
import { skip } from 'node:test';
import { take } from 'rxjs';
import { Personal } from 'src/typeorm/entities/Personal';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { FilterOperator, FilterSuffix, PaginateQuery, Paginated } from 'nestjs-paginate';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository : Repository <User>,
        @InjectRepository(Personal) private personalRepository : Repository <Personal>
    ){
    
    }
        findAllUser(PaginationDto : PaginationDto) : Promise<User[]>{
       const{limit,page} = PaginationDto;
        return this.userRepository.find(
            {
                relations: ['personal'], // Include the personal relation
                take: limit,
                skip: (page - 1) * limit,
        
            }
        );
    }
    async findUserByFirstName(firstName: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { firstName } });
    }
    
    createUser(userDetails : CreateUserParams){
        const newUser = this.userRepository.create({
           ...userDetails,
                });
      return this.userRepository.save(newUser);
    }
    async updateUser(id : number , userUpdate : UpdateUserParams){
       return this.userRepository.update({id},{...userUpdate});
    }
    async createPersonalById(id : number , personalDetails : CreatePersonalParams){
        const user = await this.userRepository.findOne({where:{id}});
        if(!user){
           throw new Error('User not found. Cannot create personal');
        }
        const newPersonal = this.personalRepository.create(personalDetails);
        const savePersonal = await this.personalRepository.save(newPersonal); // Await the savePersonal promise
        user.personal = savePersonal;
        return this.userRepository.save(user);
    }
    // async findUserById(id : number){
    //     return this.userRepository.findOne({where:{id}});
    // }
    // async findUserById(id: number): Promise<User> {
    //     const user = await this.userRepository.findOne({ where: { id } });

    //     const personal = await this.personalRepository.findOne({ where: { user_id  } });
    //     user.personal = personal;
    //     return user;
    //   }
    async findUserById(id: number): Promise<User> {
        return this.userRepository.findOne({
          where: { id },
          relations: ['personal'],
        });
      }
    async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
        const queryBuilder = this.userRepository.createQueryBuilder('c');
       queryBuilder.take(5);
        queryBuilder.orderBy('password','DESC'); // Or whatever you need to do
        return paginate<User>(queryBuilder, options);
      }
 

}
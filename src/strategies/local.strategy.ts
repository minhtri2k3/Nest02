import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { constants } from 'buffer';
import { Strategy, ExtractJwt } from 'passport-local';
import { UsersService } from 'src/users/services/users/users.service';
import { UserLoginDto } from '../users/dtos/userlogin.dto';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor( 
    private UserService : UsersService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email : string , password : string) {
    const user = await this.UserService.validateUser({email , password});
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }  
    return user;
  
  }
}

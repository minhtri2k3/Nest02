import { ValidateNested } from "class-validator";
import { CreatePersonalDto } from "./CreatePersonal.dto";
import { Type } from 'class-transformer';

export class UpdateUserDto{
    firstName : string ;
    lastName : string ;
    password : string;
    isActive : boolean;
  @ValidateNested()
  @Type(() => CreatePersonalDto)
  personal: CreatePersonalDto;
}
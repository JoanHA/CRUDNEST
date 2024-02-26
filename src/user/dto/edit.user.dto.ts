import { IsEmail, IsOptional } from 'class-validator';

export class EditUserDto {
  id:number
  @IsEmail()
  @IsOptional()
  email: string;
  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditBookmarDto {
@IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
  
  @IsString()
  @IsOptional()
  link?: string;
}

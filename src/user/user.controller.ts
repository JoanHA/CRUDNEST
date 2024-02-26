import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto/edit.user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userSevice:UserService){}
  
  @Get('profile')
  getProfile(@GetUser() user: User) {
    return user;
  }
  @Patch()
  editUser(
    @Body('id') userId: number, 
    @Body() dto: EditUserDto) {
      this.userSevice.editUser(userId,dto);
    }
}

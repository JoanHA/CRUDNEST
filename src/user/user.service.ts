import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto/edit.user.dto';

@Injectable()
export class UserService {
  constructor(private Prisma: PrismaService) {}
  async editUser(UserId: number,dto:EditUserDto) {
    const user = await this.Prisma.user.update({
        where:{
            id:UserId
        },
        data:{
            ...dto
        }
    })
    delete  user.hash
    return user
  }
}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './DTOs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  public signUp(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
@HttpCode(HttpStatus.OK)
  @Post('signin')
  public logIn(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}

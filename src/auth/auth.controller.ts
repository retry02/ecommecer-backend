import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterAuthDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  login(@Body() user: LoginAuthDto) {
    return this.authService.login(user);
  }
}

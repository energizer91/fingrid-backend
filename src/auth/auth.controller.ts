import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserRequest } from '../types/user-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: UserRequest) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async register(@Body() registerDto: RegisterDto) {
    const { email, name, password } = registerDto;
    return this.authService.register(email, name, password);
  }
}

import { Controller, Delete, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Response, Request } from 'express';
import { UserRequest } from '../types/user-request.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteUser(@Req() req: UserRequest, @Res() res: Response) {
    const userId = req.user.id;
    const deletedUser = await this.userService.delete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  }
}

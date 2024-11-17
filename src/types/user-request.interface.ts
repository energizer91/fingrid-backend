import { Request } from 'express';
import { LoginDto } from '../auth/dto/login.dto';

export interface UserRequest extends Request {
  user?: LoginDto;
}

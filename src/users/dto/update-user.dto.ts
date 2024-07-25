import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// TODO: Update fields - Campos de la actualización.
export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  lastname?: string;
  email?: string;
  phone?: number;
  password?: string;
  image?: string;
  notification_token?: string;
}

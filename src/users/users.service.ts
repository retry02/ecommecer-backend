import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // TODO: Updating user - Actualizando usuario.
  async update(id: number, user: UpdateUserDto) {
    console.log('UPDATE DAT: ', user);

    const userFound = await this.usersRepository.findOneBy({ id: id });

    // * Validations - Validación.
    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    // * Object:
    // * Receives the found user -Recibe el usuario encontrado.
    // * User's aggregate data - Los datos agregado del usuario.
    const updatedUser = Object.assign(userFound, user);

    // * Data returned - Retornado los datos.
    return this.usersRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

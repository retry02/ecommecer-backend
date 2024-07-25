import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { RegisterAuthDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register(user: RegisterAuthDto) {
    // * Check if email is available - Verificador si el correo está disponible.
    const emailExist = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (emailExist) {
      return new HttpException('Email ya esta registrado', HttpStatus.CONFLICT);
    }

    // * Check if the phone number is available - Verificador si el numero de telefono está disponible.
    const phoneExist = await this.usersRepository.findOneBy({
      phone: user.phone,
    });

    if (phoneExist) {
      return new HttpException(
        'Numero de telefono ya esta registrado',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = this.usersRepository.create(user);
    const userSave = await this.usersRepository.save(newUser);

    // TODO: Creating the user token and returning the data - Creando el token de usuario y retornando con la data.
    const payload = { id: userSave.id, name: userSave.name };
    const token = this.jwtService.sign(payload);
    const data = {
      user: userSave,
      token: 'Bearer ' + token,
    };
    // * This action deletes the password so as not to return it - Esta acción elimina la contraseña para no retornarla.
    delete data.user.password;
    return data;
  }

  async login(loginData: LoginAuthDto) {
    const { email, password } = loginData;

    // * Check if email is available - Verificador si el correo está disponible.
    const userFound = await this.usersRepository.findOneBy({ email: email });

    if (!userFound) {
      return new HttpException('El email no exite', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid) {
      return new HttpException(
        'La contraseñas es incorrecta',
        HttpStatus.FORBIDDEN,
      );
    }

    // TODO: Creating the user token and returning the data - Creando el token de usuario y retornando con la data.
    const payload = { id: userFound.id, name: userFound.name };
    const token = this.jwtService.sign(payload);
    const data = {
      user: userFound,
      token: 'Bearer ' + token,
    };
    // * This action deletes the password so as not to return it - Esta acción elimina la contraseña para no retornarla.
    delete data.user.password;
    return data;
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AES, enc } from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const bytes = AES.decrypt(pass, environment.secret_key);
    pass = bytes.toString(enc.Utf8);
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getUser(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const clonedUser = Object.assign({}, user);
    clonedUser.password = AES.encrypt(clonedUser.password, environment.secret_key).toString();
    return clonedUser;
  }

  async login(user: any) {
    user = await this.usersService.findOne(user.username);
    const payload = { username: user.username, sub: user.id };
    const clonedUser = Object.assign({}, user);
    clonedUser.password = AES.encrypt(clonedUser.password, environment.secret_key).toString();
    return {
      userInfo: clonedUser,
      access_token: this.jwtService.sign(payload),
    };
  }
}

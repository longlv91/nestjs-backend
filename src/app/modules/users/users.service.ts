import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../dto/UserDTO';
import { users } from '../../../assets/users';

@Injectable()
export class UsersService {

  private readonly users: UserDTO[];

  constructor() {
    this.users = users;
  }

  async findOne(username: string): Promise<UserDTO | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneById(userId: string): Promise<UserDTO | undefined> {
    return this.users.find(user => user.id === userId);
  }
}

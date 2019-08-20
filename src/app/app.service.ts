import { Injectable } from '@nestjs/common';
import menus from '../assets/data';

@Injectable()
export class AppService {
  getMenus(): any {
    return menus;
  }
}

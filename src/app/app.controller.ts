import { Controller, Get, Res, HttpStatus, UseGuards, Post, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { UserDTO } from './dto/UserDTO';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get('menus')
  getMenus(): string {
    return this.appService.getMenus();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userDTO: UserDTO) {
    return this.authService.login(userDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Query('username') username: string) {
    return this.authService.getUser(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('check-token')
  checkToken(@Res() res): any {
    res.status(HttpStatus.OK).json({ message: 'Valid token' });
  }
}

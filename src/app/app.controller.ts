import { Controller, Get, Res, HttpStatus, UseGuards, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { UserDTO } from './dto/UserDTO';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get('menus')
  @ApiUseTags('Backend API')
  getMenus(): string {
    return this.appService.getMenus();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiUseTags('Backend API')
  async login(@Body() userDTO: UserDTO) {
    return this.authService.login(userDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('profile')
  @ApiUseTags('Backend API')
  getProfile(@Query('username') username: string) {
    return this.authService.getUser(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('check-token')
  @ApiUseTags('Backend API')
  checkToken(@Res() res): any {
    res.status(HttpStatus.OK).json({ message: 'Valid token' });
  }
}

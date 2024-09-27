import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = req.user;
    return this.usersService.findOneById(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = req.user;
    return this.usersService.update(user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteProfile(@Req() req: Request) {
    const user = req.user;
    await this.usersService.remove(user.id);
    return { message: 'Profile deleted successfully' };
  }
}

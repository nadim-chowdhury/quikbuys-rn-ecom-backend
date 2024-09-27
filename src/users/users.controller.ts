import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@ApiTags('users') // Group under 'users' tag in Swagger UI
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Registration endpoint
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Login endpoint
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto.email, loginDto.password);
  }

  // Get user profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth()
  async getProfile(@Req() req: Request) {
    const user = req.user;
    return this.usersService.findOneById(user['id']);
  }

  // Update user profile
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = req.user;
    return this.usersService.update(user['id'], updateUserDto);
  }

  // Delete user profile
  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  @ApiOperation({ summary: 'Delete user profile' })
  @ApiBearerAuth()
  async deleteProfile(@Req() req: Request) {
    const user = req.user;
    await this.usersService.remove(user['id']);
    return { message: 'Profile deleted successfully' };
  }
}

import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('otp/send')
  async sendOtp(@Body('mobile') mobile: string) {
    return this.authService.sendOtp(mobile);
  }

  @Post('otp/verify')
  async verifyOtp(@Body() body: { mobile: string; otp: string }) {
    return this.authService.verifyOtp(body.mobile, body.otp);
  }

  @Post('email/send-verification')
  async sendEmailVerification(@Body('email') email: string) {
    return this.authService.sendEmailVerification(email);
  }
}

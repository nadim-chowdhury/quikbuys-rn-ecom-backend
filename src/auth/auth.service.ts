import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { OtpService } from 'src/otp/otp.service';
import { FirebaseService } from 'src/firebase/firebase.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private otpService: OtpService,
    private firebaseService: FirebaseService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async sendOtp(mobile: string) {
    return this.otpService.sendOtp(mobile); // Sends OTP via AWS SNS or Fast2SMS
  }

  async verifyOtp(mobile: string, otp: string) {
    return this.otpService.verifyOtp(mobile, otp); // Verifies OTP
  }

  async sendEmailVerification(email: string) {
    return this.firebaseService.sendVerificationEmail(email); // Sends email verification via Firebase
  }
}

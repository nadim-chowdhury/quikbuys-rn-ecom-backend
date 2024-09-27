import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log('user:', user.password);
    if (!user) {
      return null; // Return null if user is not found
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    console.log('Password valid:', isPasswordValid);

    if (isPasswordValid) {
      const { password, ...result } = user; // Omit the password from the result
      return result;
    }
    return null; // Return null if password does not match
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

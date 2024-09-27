import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User, UserRole } from 'src/entities/user.entity'; // Import UserRole enum
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    // Cast role to the UserRole enum
    const userRole = role as UserRole;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      role: userRole, // Use the enum here
    });
    return this.usersRepository.save(user);
  }

  // Find user by email
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Find user by ID
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Update user by ID
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { password, profile } = updateUserDto;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    await this.usersRepository.update(id, {
      ...(password && { password: hashedPassword }),
      ...(profile && { profile }),
    });
    return this.findOneById(id); // Return updated user
  }

  // Remove user by ID
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Find all users (optional for admin functionality)
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}

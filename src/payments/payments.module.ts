import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { UsersService } from '../users/users.service';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  providers: [PaymentsService, UsersService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { OrdersModule } from '../orders/orders.module'; // Import OrdersModule to access OrderRepository

@Module({
  imports: [OrdersModule], // Import OrdersModule
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}

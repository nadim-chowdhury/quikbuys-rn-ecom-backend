import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Order } from 'src/entities/order.entity'; // Import the Order entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), // Register Order entity in TypeOrmModule
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}

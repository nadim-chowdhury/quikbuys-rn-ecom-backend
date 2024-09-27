import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Order } from 'src/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])], // Import the Order entity for TypeORM
  providers: [ReportsService], // Provide the ReportsService
  controllers: [ReportsController], // Register the ReportsController
})
export class ReportsModule {}

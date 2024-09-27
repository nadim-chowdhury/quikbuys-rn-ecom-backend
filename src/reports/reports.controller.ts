import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/roles/roles.guard';
import { Role } from 'src/users/roles/role.enum';
import { Roles } from 'src/users/roles/roles.decorator';

@ApiTags('reports') // Group under 'reports' tag in Swagger UI
@Controller('reports')
@UseGuards(RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get sales report for a given date range' })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'Start date for the report',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'End date for the report',
  })
  getSalesReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportsService.getSalesReport(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('analytics')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get overall analytics' })
  getAnalytics() {
    return this.reportsService.getAnalytics();
  }
}

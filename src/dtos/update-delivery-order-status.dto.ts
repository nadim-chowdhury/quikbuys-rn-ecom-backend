import { IsNotEmpty } from 'class-validator';

export class UpdateDeliveryOrderStatusDto {
  @IsNotEmpty()
  status: 'picked_up' | 'out_for_delivery' | 'delivered' | 'failed';
}

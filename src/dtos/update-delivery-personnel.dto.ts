import { IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateDeliveryPersonnelDto {
  @IsOptional()
  @IsNotEmpty()
  fullName?: string;

  @IsOptional()
  mobileNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  vehicleDetails?: string;

  @IsOptional()
  profilePicture?: string;

  @IsOptional()
  drivingLicense?: string;
}

import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateDeliveryPersonnelDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  mobileNumber: string;

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

import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateSellerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  shopName: string;

  @IsNotEmpty()
  mobileNumber: string;

  @IsOptional()
  gstin?: string;

  @IsOptional()
  udyamRegistrationNumber?: string;

  @IsOptional()
  shopPhotos?: string[];
}

import { IsEmail, IsOptional, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateSellerDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  shopName?: string;

  @IsOptional()
  @IsNotEmpty()
  mobileNumber?: string;

  @IsOptional()
  gstin?: string;

  @IsOptional()
  udyamRegistrationNumber?: string;

  @IsOptional()
  shopPhotos?: string[];
}

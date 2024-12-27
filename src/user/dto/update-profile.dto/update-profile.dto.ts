import { IsString, IsOptional } from 'class-validator';
import { AddressDto } from '../address.dto/address.dto';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  address?: AddressDto;
}

import { IsString } from 'class-validator';
import { AddressDto } from '../address.dto/address.dto';

export class CreateProfileDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: AddressDto;
}

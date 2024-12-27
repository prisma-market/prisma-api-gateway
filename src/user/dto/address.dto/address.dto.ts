import { IsString, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  country: string;
}

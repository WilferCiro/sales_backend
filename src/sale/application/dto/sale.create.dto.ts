import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from "class-validator";

class CreateProductDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  unit_price: number;
  @IsOptional()
  discount_percent: number;
}
class CreateShopDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;
}
class CreateHeadquarterDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  shop: CreateShopDto;
}
class CreateUserDto {
  @IsOptional()
  id?: number;
  @IsOptional()
  name?: string;
  @IsOptional()
  document?: string;
  @IsOptional()
  email?: string;
}

export class CreateSaleDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateProductDto)
  products: CreateProductDto[];

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateHeadquarterDto)
  headquarter: CreateHeadquarterDto;

  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => CreateUserDto)
  client: CreateUserDto;
}

import { IsOptional } from "class-validator";

class UpdateClientDto {
  @IsOptional()
  firstName?: string;
  @IsOptional()
  lastName?: string;
}

export class UpdateSaleDto {
  @IsOptional()
  client?: UpdateClientDto;
}

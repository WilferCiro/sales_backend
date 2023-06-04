// Nest
import { Injectable } from "@nestjs/common";

// Application
import { SaleDto } from "../dto/sale.dto";

// Domain
import { Sale } from "src/sale/domain/entities/sale.type";
import { CreateSaleDto } from "../dto/sale.create.dto";
import { UpdateSaleDto } from "../dto/sale.update.dto";
import { DomainCreateSaleDto } from "src/sale/domain/dto/sale.create.dto";
import { DomainUpdateSaleDto } from "src/sale/domain/dto/sale.update.dto";

// Shared

@Injectable()
export class SaleMapper {
  toDomainCreate(saleDto: CreateSaleDto): DomainCreateSaleDto {
    return saleDto as DomainCreateSaleDto;
  }

  toDomainUpdate(saleDto: UpdateSaleDto): DomainUpdateSaleDto {
    const { client } = saleDto;
    return { client };
  }

  toDto(sale: Sale): SaleDto {
    return {
      total: sale.total,
      products: sale.products,
      id: sale._id,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
      client: sale.client,
    } as unknown as SaleDto;
  }
}

// Nest
import {
  Body,
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";

// Application
import { SaleMapper } from "../mapper/sale.mapper";
import { CreateSaleDto } from "../dto/sale.create.dto";
import { UpdateSaleDto } from "../dto/sale.update.dto";
import { SaleDto } from "../dto/sale.dto";
// Domain
import { SaleService } from "src/sale/domain/interfaces/sale.service.interface";
import { Sale } from "src/sale/domain/entities/sale.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/application/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { Response } from "express";

@Controller("sales")
export class SaleController extends BaseController {
  private mapper: SaleMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject("SaleService") private readonly service: SaleService) {
    super();
    this.mapper = new SaleMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query()
    paginationDto: PaginatedDto & {
      fromDate: Date | null;
      endDate: Date | null;
    }
  ): Promise<PaginatedResultInterface<SaleDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const { fromDate, endDate } = paginationDto;
    const data = await this.service.findPaginated(pagination, {
      fromDate,
      endDate,
    });
    return {
      total: data.total,
      data: data.data.map((d: Sale) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findById(@Param("id") id: string): Promise<SaleDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() sale: CreateSaleDto): Promise<SaleDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(sale));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post("export/:id")
  @Header("Content-Type", "application/pdf")
  @Header("Content-Disposition", "attachment; filename=sale.pdf")
  async export(@Param("id") id: string, @Res() res: Response) {
    const data = await this.service.export(id);
    res.send(data);
  }
}

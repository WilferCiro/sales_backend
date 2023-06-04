// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { Sale } from "src/sale/domain/entities/sale.type";
import { SaleRepository } from "src/sale/domain/interfaces/sale.repository.interface";
import { SaleService } from "src/sale/domain/interfaces/sale.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateSaleDto } from "src/sale/domain/dto/sale.create.dto";
import { DomainUpdateSaleDto } from "src/sale/domain/dto/sale.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { FilesServiceInterface } from "src/modules/files/domain/interfaces/files.service.interface";
import { UserService } from "src/user/domain/interfaces/user.service.interface";

@Injectable()
export class SaleServiceImpl implements SaleService {
  constructor(
    @Inject("SaleRepository")
    private readonly repository: SaleRepository,
    @Inject("FilesService")
    private readonly filesService: FilesServiceInterface,
    @Inject("UserService") private readonly userService: UserService
  ) {}

  async findAll(): Promise<Sale[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Sale> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
    dates: { fromDate: Date | null; endDate: Date | null }
  ): Promise<PaginatedResultInterface<Sale>> {
    return await this.repository.findPaginated(pagination, dates);
  }

  async create(sale: DomainCreateSaleDto): Promise<Sale> {
    const user = await this.userService.getUserProfile();
    const newSale = {
      ...sale,
      total: sale.products.reduce((a, b) => a + b.quantity * b.unit_price, 0),
      user: {
        id: user.id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
      },
    };
    return await this.repository.create(newSale);
  }

  async export(id: string): Promise<Buffer> {
    const data = await this.repository.findById(id);
    return this.filesService.generatePDF({
      data,
      templateUrl: "invoice.html",
    });
  }

  async update(id: string, sale: DomainUpdateSaleDto): Promise<Sale> {
    return await this.repository.update(id, sale);
  }
}

// Nest

// Domain
import { DomainCreateSaleDto } from '../dto/sale.create.dto';
import { DomainUpdateSaleDto } from '../dto/sale.update.dto';
import { Sale } from '../entities/sale.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface SaleRepository {
  findById(id: string): Promise<Sale>;
  findAll(): Promise<Sale[]>;
  findPaginated(
    pagination: DomainPaginationDto,
    dates: { fromDate: Date | null; endDate: Date | null }
  ): Promise<PaginatedResultInterface<Sale>>;

  create(sale: DomainCreateSaleDto): Promise<Sale>;
  update(id: string, sale: DomainUpdateSaleDto): Promise<Sale>;
}

// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from "@nestjs/common";
import { SaleController } from "../application/controllers/sale.controller";
import { SaleRepositoryImpl } from "./mongodb/repositories/sale.repository";
import { SaleServiceImpl } from "../application/services/sale.service";
import { MongooseModule } from "@nestjs/mongoose";
import { SaleSchema } from "./mongodb/schemas/sale.schema";
import { FilesModule } from "src/modules/files/infrastructure/files.module";
import { UsersModule } from "src/user/infraestructure/user.module";

const providers: Provider[] = [
  {
    provide: "SaleRepository",
    useClass: SaleRepositoryImpl,
  },
  {
    provide: "SaleService",
    useClass: SaleServiceImpl,
  },
];

@Module({
  imports: [
    UsersModule,
    FilesModule,
    MongooseModule.forFeature([{ name: "Sale", schema: SaleSchema }]),
  ],
  controllers: [SaleController],
  providers: providers,
})
export class SalesModule {}

import { Module } from "@nestjs/common";
import { CoreModule } from "./shared/core.module";
import { MongodbProvider } from "./shared/infrastructure/database/mongodb/mongodb.provider";
import { EmailProvider } from "./shared/infrastructure/email/email.provider";
import { SalesModule } from "./sale/infrastructure/sale.module";
import { HttpModule } from "@nestjs/axios";
import { RequestContextModule } from "./modules/context/infraestructure/context.module";

@Module({
  imports: [
    RequestContextModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MongodbProvider,
    CoreModule,
    EmailProvider,
    SalesModule,
  ],
})
export class AppModule {}

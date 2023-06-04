// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Global, Module, Provider } from "@nestjs/common";
import { UserServiceImpl } from "../application/services/user.service";
import { UserRepositoryImpl } from "./http/repositories/user.repository";
import { HttpModule } from "@nestjs/axios";

const userProviders: Provider[] = [
  {
    provide: "UserRepository",
    useClass: UserRepositoryImpl,
  },
  {
    provide: "UserService",
    useClass: UserServiceImpl,
  },
];
@Global()
@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [...userProviders],
  exports: [...userProviders],
})
export class UsersModule {}

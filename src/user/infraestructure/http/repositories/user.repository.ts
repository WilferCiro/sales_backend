import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";
import { User } from "src/user/domain/entities/user.type";
import { UserRepository } from "src/user/domain/interfaces/user.repository.interface";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly httpService: HttpService,
    @Inject("RequestContext")
    private readonly contextService: RequestContextService,
    private readonly configService: ConfigService
  ) {}

  async getUserProfile(): Promise<User> {
    const token = this.contextService.get<string>("token");
    const request = await this.httpService.axiosRef.get(
      this.configService.get("API_DASHBOARD_URL") + "/users/profile",
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return request.data as User;
  }
}

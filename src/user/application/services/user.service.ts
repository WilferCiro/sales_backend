import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/user/domain/entities/user.type";
import { UserRepository } from "src/user/domain/interfaces/user.repository.interface";
import { UserService } from "src/user/domain/interfaces/user.service.interface";

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject("UserRepository") private readonly repository: UserRepository
  ) {}

  async getUserProfile(): Promise<User> {
    return this.repository.getUserProfile();
  }
}

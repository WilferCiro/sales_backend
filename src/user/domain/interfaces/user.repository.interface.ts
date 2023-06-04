import { User } from "../entities/user.type";

export interface UserRepository {
  getUserProfile(): Promise<User>;
}

import { User } from "../entities/user.type";

export interface UserService {
  getUserProfile(): Promise<User>;
}

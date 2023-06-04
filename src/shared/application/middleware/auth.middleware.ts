import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";
import { UserService } from "src/user/domain/interfaces/user.service.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject("RequestContext")
    private readonly contextService: RequestContextService,
    @Inject("UserService")
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      this.contextService.set<string>("token", token);
      const user = await this.userService.getUserProfile();
      if (user) {
        request["user"] = user;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

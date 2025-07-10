import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { UserType } from "./user.type";
import { UserService } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.input";
import { AuthResponse } from "../auth/auth.type";
import { MyContext } from "../../types/context";

@Resolver(() => UserType)
export class UserResolver {
  private userService = new UserService();

  // ✅ Register a new user
  @Mutation(() => UserType)
  async register(
    @Arg("data") data: CreateUserInput
  ): Promise<UserType> {
    return this.userService.register(data);
  }

  // ✅ Login user
  @Mutation(() => AuthResponse)
  async login(
    @Arg("data") data: LoginInput
  ): Promise<AuthResponse> {
    return this.userService.login(data);
  }

  // ✅ Get current logged in user (Protected)
  @Query(() => UserType)
  async me(@Ctx() ctx: MyContext): Promise<UserType | null> {
    const userId = ctx.req.userId; // comes from auth middleware
    if (!userId) throw new Error("Not authenticated");
    return this.userService.findById(userId);
  }

  // ✅ Get all users (Admin only)
  @Query(() => [UserType])
  @Authorized("ADMIN") // <-- type-graphql Role-Based Access
  async users(): Promise<UserType[]> {
    return this.userService.findAll();
  }
}

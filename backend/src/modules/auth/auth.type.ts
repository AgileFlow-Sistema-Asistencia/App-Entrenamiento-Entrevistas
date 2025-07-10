import { ObjectType, Field } from "type-graphql";
import { UserType } from "../users/user/user.type";

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;

  @Field(() => UserType)
  user: UserType;
}

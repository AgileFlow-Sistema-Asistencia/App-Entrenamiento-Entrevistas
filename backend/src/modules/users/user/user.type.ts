import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class UserType {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

import { UserModel } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateUserInput, LoginInput } from "./user.input";

export class UserService {
  async register(data: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new UserModel({
      ...data,
      password: hashedPassword,
    });
    return user.save();
  }

  async login(data: LoginInput) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return { token, user };
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async findAll() {
    return UserModel.find();
  }
}

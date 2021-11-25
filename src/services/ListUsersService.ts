import { User } from "../models/User";
import prismaClient from '../prisma';

export class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await prismaClient.user.findMany();

    return users;
  }
}
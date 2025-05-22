import { Context } from '../../context.js';
import { UUIDType } from '../../types/uuid.js';
import {
  ChangeUserInputObjectType,
  ChangeUserRequest,
  CreateUserInputObjectType,
  CreateUserRequest,
  UserType,
} from './type.js';

export const userMutations = {
  createUser: {
    type: UserType,
    args: { dto: { type: CreateUserInputObjectType } },
    resolve: async (_parent, { dto }: CreateUserRequest, { prisma }: Context) => {
      return await prisma.user.create({ data: dto });
    },
  },
  changeUser: {
    type: UserType,
    args: { id: { type: UUIDType }, dto: { type: ChangeUserInputObjectType } },
    resolve: async (_parent, { id, dto }: ChangeUserRequest, { prisma }: Context) => {
      return await prisma.user.update({ where: { id }, data: dto });
    },
  },
  deleteUser: {
    type: UserType,
    args: { id: { type: UUIDType } },
    resolve: async (_parent, { id }, { prisma }: Context) => {
      return await prisma.user.delete({ where: { id } });
    },
  },
};

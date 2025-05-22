import { GraphQLBoolean } from 'graphql';
import { Context } from '../../context.js';
import { UUIDType } from '../../types/uuid.js';
import {
  ChangeUserInputObjectType,
  ChangeUserRequest,
  CreateUserInputObjectType,
  CreateUserRequest,
  SubscribeToUserRequest,
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
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async (_parent, { id }, { prisma }: Context) => {
      try {
        await prisma.user.delete({ where: { id } });
      } catch {
        return false;
      }

      return true;
    },
  },
  subscribeTo: {
    type: GraphQLBoolean,
    args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
    resolve: async (
      _parent,
      { userId, authorId }: SubscribeToUserRequest,
      { prisma }: Context,
    ) => {
      try {
        await prisma.subscribersOnAuthors.create({
          data: { subscriberId: userId, authorId },
        });
      } catch {
        return false;
      }

      return true;
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
    resolve: async (
      _parent,
      { userId, authorId }: SubscribeToUserRequest,
      { prisma }: Context,
    ) => {
      try {
        await prisma.subscribersOnAuthors.deleteMany({
          where: { subscriberId: userId, authorId: authorId },
        });
      } catch {
        return false;
      }

      return true;
    },
  },
};

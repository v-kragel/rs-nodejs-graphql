import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UserType } from './type.js';
import { Context } from '../../context.js';
import { UUIDType } from '../../types/uuid.js';

export const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_parent, _args, { prisma }: Context) => await prisma.user.findMany(),
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_parent: unknown, args: { id: string }, { prisma }: Context) =>
      await prisma.user.findUnique({ where: { id: args.id } }),
  },
};

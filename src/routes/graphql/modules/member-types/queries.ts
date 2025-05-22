import { GraphQLList, GraphQLNonNull } from 'graphql';
import { MemberType, MemberTypeIdEnum } from './type.js';
import { Context } from '../../context.js';

export const memberTypeQueries = {
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (_parent, _args, { prisma }: Context) =>
      await prisma.memberType.findMany(),
  },
  memberType: {
    type: MemberType,
    args: {
      id: {
        type: new GraphQLNonNull(MemberTypeIdEnum),
      },
    },
    resolve: async (_parent: unknown, args: { id: string }, { prisma }: Context) =>
      await prisma.memberType.findUnique({ where: { id: args.id } }),
  },
};

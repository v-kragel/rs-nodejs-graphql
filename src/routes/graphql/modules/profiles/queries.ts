import { GraphQLList, GraphQLNonNull } from 'graphql';
import { ProfileType } from './type.js';
import { Context } from '../../context.js';
import { UUIDType } from '../../types/uuid.js';

export const profileQueries = {
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_parent, _args, { prisma }: Context) =>
      await prisma.profile.findMany(),
  },
  profile: {
    type: ProfileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_parent: unknown, args: { id: string }, { prisma }: Context) =>
      await prisma.profile.findUnique({ where: { id: args.id } }),
  },
};

import { GraphQLList, GraphQLNonNull } from 'graphql';
import { PostType } from './type.js';
import { Context } from '../../context.js';
import { UUIDType } from '../../types/uuid.js';

export const postQueries = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_parent, _args, { prisma }: Context) => await prisma.post.findMany(),
  },
  post: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_parent: unknown, args: { id: string }, { prisma }: Context) =>
      await prisma.post.findUnique({ where: { id: args.id } }),
  },
};

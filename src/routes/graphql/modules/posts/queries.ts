import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { PostType } from './type.js';
import { Context } from '../../context.js';

export const postQueries = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: (_parent, _args, { prisma }: Context) => prisma.post.findMany(),
  },
  post: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (_parent: unknown, args: { id: string }, { prisma }: Context) =>
      prisma.post.findUnique({ where: { id: args.id } }),
  },
};

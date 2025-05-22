import {
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { PostType } from '../posts/type.js';
import { Context } from '../../context.js';
import { ProfileType } from '../profiles/type.js';

export interface User {
  id: string;
  name: string;
  balance: number;
}

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent: User, _, { prisma }: Context) =>
        await prisma.post.findMany({ where: { authorId: parent.id } }),
    },
    profile: {
      type: ProfileType,
      resolve: async (parent: User, _, { prisma }: Context) =>
        await prisma.profile.findUnique({ where: { userId: parent.id } }),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent: User, _, { prisma }: Context) =>
        await prisma.user.findMany({
          where: { subscribedToUser: { some: { subscriberId: parent.id } } },
        }),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent: User, _, { prisma }: Context) =>
        await prisma.user.findMany({
          where: { userSubscribedTo: { some: { authorId: parent.id } } },
        }),
    },
  }),
});

export const CreateUserInputObjectType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export interface CreateUserRequest {
  dto: {
    name: string;
    balance: number;
  };
}

export const ChangeUserInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export interface ChangeUserRequest {
  id: string;
  dto: {
    name: string;
    balance: number;
  };
}

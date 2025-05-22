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

export type Author = {
  userSubscribedTo: {
    subscriberId: string;
    authorId: string;
  }[];
} & User;

export type Subscription = {
  subscribedToUser: {
    subscriberId: string;
    authorId: string;
  }[];
} & User;

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent: User, _, { loaders }: Context) =>
        await loaders.postsLoader.load(parent.id),
    },
    profile: {
      type: ProfileType,
      resolve: async (parent: User, _, { loaders }: Context) =>
        await loaders.profilesLoader.load(parent.id),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent: User, _, { loaders }: Context) =>
        loaders.userToSubscribeLoader.load(parent.id),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent: User, _, { loaders }: Context) =>
        loaders.subscribedToUserLoader.load(parent.id),
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

export interface SubscribeToUserRequest {
  userId: string;
  authorId: string;
}

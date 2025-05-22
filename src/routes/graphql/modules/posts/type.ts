import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export const CreatePostInputObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export interface CreatePostRequest {
  dto: {
    authorId: string;
    title: string;
    content: string;
  };
}

export const ChangePostInputObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});

export interface ChangePostRequest {
  id: string;
  dto: {
    authorId: string;
    title: string;
    content: string;
  };
}

export interface DeletePostRequest {
  id: string;
}

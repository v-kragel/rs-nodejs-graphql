import { Context } from '../../context.js';
import { UUIDType } from '../../types/uuid.js';
import {
  CreatePostRequest,
  CreatePostInputObjectType,
  ChangePostInputObjectType,
  PostType,
  ChangePostRequest,
  DeletePostRequest,
} from './type.js';

export const postMutations = {
  createPost: {
    type: PostType,
    args: { dto: { type: CreatePostInputObjectType } },
    resolve: async (_parent, { dto }: CreatePostRequest, { prisma }: Context) => {
      return await prisma.post.create({ data: dto });
    },
  },
  changePost: {
    type: PostType,
    args: { id: { type: UUIDType }, dto: { type: ChangePostInputObjectType } },
    resolve: async (_parent, { id, dto }: ChangePostRequest, { prisma }: Context) => {
      return await prisma.post.update({ where: { id }, data: dto });
    },
  },
  deletePost: {
    type: PostType,
    args: { id: { type: UUIDType } },
    resolve: async (_parent, { id }: DeletePostRequest, { prisma }: Context) => {
      return await prisma.post.delete({ where: { id } });
    },
  },
};

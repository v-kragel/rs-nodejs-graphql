import { GraphQLBoolean } from 'graphql';
import { Context } from '../../context.js';
import { UUIDType } from '../../types/uuid.js';
import {
  ChangeProfileInputObjectType,
  ChangeProfileRequest,
  CreateProfileInputObjectType,
  CreateProfileRequest,
  ProfileType,
} from './type.js';

export const profileMutations = {
  createProfile: {
    type: ProfileType,
    args: { dto: { type: CreateProfileInputObjectType } },
    resolve: async (_parent, { dto }: CreateProfileRequest, { prisma }: Context) => {
      return await prisma.profile.create({ data: dto });
    },
  },
  changeProfile: {
    type: ProfileType,
    args: { id: { type: UUIDType }, dto: { type: ChangeProfileInputObjectType } },
    resolve: async (_parent, { id, dto }: ChangeProfileRequest, { prisma }: Context) => {
      return await prisma.profile.update({ where: { id }, data: dto });
    },
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async (_parent, { id }, { prisma }: Context) => {
      try {
        await prisma.profile.delete({ where: { id } });
      } catch {
        return false;
      }

      return true;
    },
  },
};

import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { MemberType, MemberTypeIdEnum } from '../member-types/type.js';
import { Context } from '../../context.js';

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    memberType: {
      type: MemberType,
      resolve: async (parent: Profile, _args, { loaders }: Context) =>
        await loaders.memberTypeLoader.load(parent.memberTypeId),
    },
  },
});

export const CreateProfileInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export interface CreateProfileRequest {
  dto: {
    userId: string;
    memberTypeId: string;
    isMale: boolean;
    yearOfBirth: number;
  };
}

export const ChangeProfileInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
    userId: { type: UUIDType },
  },
});

export interface ChangeProfileRequest {
  id: string;
  dto: {
    userId: string;
    memberTypeId: string;
    isMale: boolean;
    yearOfBirth: number;
  };
}

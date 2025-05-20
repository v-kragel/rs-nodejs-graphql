import { GraphQLList, GraphQLNonNull } from 'graphql';
import { MemberType, MemberTypeIdEnum } from './type.js';

export function memberTypeQueries(prisma: any) {
  return {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: () => prisma.memberType.findMany(),
    },
    memberType: {
      type: MemberType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdEnum),
        },
      },
      resolve: (_parent: unknown, args: { id: string }) =>
        prisma.memberType.findUnique({ where: { id: args.id } }),
    },
  };
}

import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { memberTypeQueries } from './modules/member-types/queries.js';
import { postQueries } from './modules/posts/queries.js';
import { postMutations } from './modules/posts/mutations.js';
import { profileQueries } from './modules/profiles/queries.js';
import { profileMutations } from './modules/profiles/mutations.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export function buildSchema() {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        ...memberTypeQueries,
        ...postQueries,
        ...profileQueries,
      },
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        ...postMutations,
        ...profileMutations,
      },
    }),
  });
}

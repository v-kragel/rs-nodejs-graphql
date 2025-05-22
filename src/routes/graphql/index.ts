import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { buildSchema, createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  const schema = buildSchema();

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const err = validate(schema, parse(query), [depthLimit(5)]);

      if (err?.length > 0) {
        return { data: '', errors: err };
      }

      const { data, errors } = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
        },
      });

      return { data, errors };
    },
  });
};

export default plugin;

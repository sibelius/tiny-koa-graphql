import { GraphQLObjectType, GraphQLString } from 'graphql';

import pkg from '../../package.json';
import { GraphQLContext } from '../types';

export const QueryType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: 'Query',
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => pkg.version,
    },
  }),
});

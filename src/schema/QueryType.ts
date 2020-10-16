import { GraphQLObjectType, GraphQLString } from 'graphql';

import { version } from '../../package.json';
import { GraphQLContextOpenPix } from '../types';

export const QueryType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContextOpenPix
>({
  name: 'Query',
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => version,
    },
  }),
});

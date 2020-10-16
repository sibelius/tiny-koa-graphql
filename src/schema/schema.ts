import { GraphQLSchema } from 'graphql';

import { MutationType } from './MutationType';
import { QueryType } from './QueryType';

export const schema = new GraphQLSchema({
  query: QueryType,
  // TODO - add at least 1 mutation
  // mutation: MutationType,
});

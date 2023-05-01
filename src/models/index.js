// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Idea } = initSchema(schema);

export {
  User,
  Idea
};
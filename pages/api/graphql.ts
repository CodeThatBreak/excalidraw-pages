import { createSchema, createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";
import { dbInit } from "@/lib/database/db";

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Todo: Figure out how to do this
// @ts-ignore
await dbInit();

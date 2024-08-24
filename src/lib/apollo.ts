// /lib/apollo.ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Scene: {
        keyFields: ["id"],
      },
    },
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
  link: new HttpLink({
    uri:
      typeof window === "undefined"
        ? `${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/${process.env.NEXT_PUBLIC_API_END_POINT}`
        : process.env.NEXT_PUBLIC_API_END_POINT,
    fetch: function (uri, options) {
      return fetch(uri, {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
        },
        next: {
          revalidate: 0,
        },
      });
    },
  }),
});

export default apolloClient;

import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "https://back.urtest.club:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;

// 'http://localhost:4000/graphql
// https://back.urtest.club:3000/graphql'

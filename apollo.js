import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "http://739315770171.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;

// 'http://localhost:4000/graphql'

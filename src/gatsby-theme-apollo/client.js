import fetch from 'isomorphic-fetch'
import { ApolloLink, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.GATSBY_GRAPHQL_API || "http://localhost:4002/graphql",
  fetch
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${process.env.GATSBY_PUBLIC_JWT}`,
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink]),
  name: 'why.withfriends.co',
  version: '1.0',
  connectToDevTools: true,
})

export default client


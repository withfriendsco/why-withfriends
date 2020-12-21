import fetch from 'isomorphic-fetch'
import { ApolloLink, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://dev.api.withfriends.co/graphql',
  fetch
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFkbWluIjpmYWxzZX0sInN1YiI6bnVsbCwiZXhwIjoxNjA4NTEyNDYzfQ._GFUTFek4OW1QjK2tAjSNJvrTGAbvjn3svxuslxkxbY`,
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


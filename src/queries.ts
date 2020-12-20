import { gql } from "@apollo/client"

export const GET_USER = gql`
  query GetUser($emailAddress: String!) {
    userByEmail(emailAddress: $emailAddress) {
      id
      emailAddress
      firstName
    }
  }
`

export const AUTHORIZE_USER = gql`
  query AuthorizeUser($id: ID!, $password: String!) {
    userAuthorize(id: $id, password: $password) {
      id
      emailAddress
      firstName
      lastName
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($emailAddress: String!, $password: String!) {
    userCreate(userInput: {
      emailAddress: $emailAddress,
      password: $password,
      passwordCreated: true,
    }) {
      id
      emailAddress
    }
  }
`

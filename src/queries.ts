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

export const CREATE_USER_EMAIL = gql`
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

export const CREATE_USER_FACEBOOK = gql`
  mutation CreateUserFacebook(
    $emailAddress: String!, 
    $facebookId: String!, 
    $firstName: String, 
    $lastName: String) {
    userCreate(userInput: {
      emailAddress: $emailAddress,
      facebookId: $facebookId,
      firstName: $firstName,
      lastName: $lastName,
    }) {
      id
    }
  }
`

export const CREATE_USER_GOOGLE = gql`
  mutation CreateUserGoogle(
    $emailAddress: String!, 
    $googleId: String!, 
    $firstName: String, 
    $lastName: String) {
    userCreate(userInput: {
      emailAddress: $emailAddress,
      googleId: $googleId,
      firstName: $firstName,
      lastName: $lastName,
    }) {
      id
    }
  }
`

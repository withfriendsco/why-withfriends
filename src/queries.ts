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
  mutation AuthorizeUser($id: ID!, $password: String!) {
    userAuthorize(id: $id, password: $password) {
      id
      emailAddress
      firstName
      lastName
      loginLink
    }
  }
`

export const CREATE_USER_EMAIL = gql`
  mutation CreateUser($emailAddress: String!, $password: String!) {
    userCreate(userInput: {
      emailAddress: $emailAddress,
      password: $password,
      passwordCreated: true,
      signUpReason: "Become_an_Organizer",
    }) {
      id
      emailAddress
      loginLink
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
      signUpReason: "Become_an_Organizer",
    }) {
      id
    }
  }
`

export const CREATE_USER_GOOGLE = gql`
  mutation CreateUserGoogle(
    $emailAddress: String!, 
    $googleId: String!, 
    $googleToken: String!, 
    $firstName: String, 
    $lastName: String) {
    userCreate(userInput: {
      emailAddress: $emailAddress,
      googleId: $googleId,
      firstName: $firstName,
      lastName: $lastName,
      signUpReason: "Become_an_Organizer",
    }, googleToken: $googleToken) {
      id
      loginLink
    }
  }
`

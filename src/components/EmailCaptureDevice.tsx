import React, { useState } from "react"
import { useApolloClient, useMutation, useLazyQuery } from "@apollo/client"

import Button from "./Button"

import { GET_USER, AUTHORIZE_USER, CREATE_USER } from "../queries"

const EmailCaptureDevice = () => {
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [searchEmailAddress, { 
    called: getUserCalled, 
    loading: getUserLoading, 
    data: userData 
  }] = useLazyQuery(GET_USER)

  const [authorizeUser, { 
    called: authorizedUserCalled, 
    loading: authorizedUserLoading, 
    data: authorizedUserData 
  }] = useLazyQuery(AUTHORIZE_USER)

  const [createUser, { 
    called: createUserCalled, 
    loading: createUserLoading, 
    data: createUserData 
  }] = useMutation(CREATE_USER)

  const submitLogin = async () => {
    searchEmailAddress({
      variables: {
        emailAddress 
      }
    })
  }

  const submitAuthorization = async () => {
    if (userData.userByEmail.id) {
      authorizeUser({
        variables: {
          id: userData.userByEmail.id,
          password
        }
      })
    }
  }

  const submitNewUser = async () => {
    if (emailAddress && password) {
      createUser({
        variables: {
          emailAddress,
          password,
        }
      })
    }
  }

  const changePassword = (ev) => {
    setPassword(ev.target.value)
  }

  const changeEmailAddress = (ev) => {
    setEmailAddress(ev.target.value)
  }

  const emailScreen = (
    <>
      <div className="w-full my-8 flex justify-center">
        <input 
          className="text-wfGray-800 p-4 text-center w-full max-w-xl" 
          value={emailAddress} 
          onChange={changeEmailAddress} 
          placeholder="you@yourstore.com" />
      </div>
      <div className="w-full flex justify-center">
        <Button 
          className="py-6 px-8 sm:px-12 text-xl"
          variant="salmon" 
          onClick={submitLogin}>
          Find Your Members
        </Button>
      </div>
    </>
  )

  const loginScreen = (
    <>
      <div className="p-8 my-2 bg-white text-lg text-wfGray-800 max-w-xl">
        Welcome back, { userData?.userByEmail?.firstName }<br />
        <br />
        Looks like you already have an account. Sign in and let's get started.
      </div>
      <div className="w-full my-8 flex justify-center">
        <input 
          type="password"
          className="text-wfGray-800 p-4 text-center w-full max-w-xl" 
          value={password} 
          onChange={changePassword} 
          placeholder="enter your password"
        />
      </div>
      <div className="w-full flex justify-center">
        <Button 
          className="py-6 px-8 sm:px-12 text-xl"
          variant="salmon" 
          onClick={submitAuthorization}>
          Continue to Login
        </Button>
      </div>
    </>
  )

  const newAccountScreen = (
    <>
      <div className="w-full p-8 my-2 bg-white text-lg text-wfGray-800 max-w-xl">
        Welcome! Create a password, and let's get started!
      </div>
      <div className="w-full my-8 flex justify-center">
        <input 
          type="password"
          className="text-wfGray-800 p-4 text-center w-full max-w-xl" 
          value={password} 
          onChange={changePassword} 
          placeholder="enter your password"
        />
      </div>
      <div className="w-full flex justify-center">
        <Button 
          className="py-6 px-8 sm:px-12 text-xl"
          variant="salmon" 
          onClick={submitNewUser}>
          Get Started
        </Button>
      </div>
    </>
  )

  const userExists = getUserCalled && emailAddress && !!userData?.userByEmail?.id

  return (
    <div className="w-full flex flex-wrap justify-center">
      {
        getUserCalled ? (
          userExists ? (
            loginScreen
          ) : (
            newAccountScreen
          )
        ) : (
          emailScreen
        )
      }
    </div>
  )
}

export default EmailCaptureDevice


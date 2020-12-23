import React, { useState } from "react"
import { useApolloClient, useMutation, useLazyQuery } from "@apollo/client"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import GoogleLogin from "react-google-login"
import { mailchimpSignup } from "../helpers/mailchimp"
import { hubspotSignup } from "../helpers/hubspot"

import Button from "./Button"
import IconItem from "./IconItem"
import Facebook from "./Facebook"
import Google from "./Google"

import { 
  GET_USER, 
  AUTHORIZE_USER, 
  CREATE_USER_EMAIL,
  CREATE_USER_FACEBOOK,
  CREATE_USER_GOOGLE,
} from "../queries"

const EmailCaptureDevice = () => {
  const [loginLoading, setLoginLoading] = useState<boolean>(false)
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
  }] = useMutation(CREATE_USER_EMAIL)

  const [createUserFacebook, { 
    called: createUserFacebookCalled, 
    loading: createUserFacebookLoading, 
    data: createUserFacebookData 
  }] = useMutation(CREATE_USER_FACEBOOK)

  const [createUserGoogle, { 
    called: createUserGoogleCalled, 
    loading: createUserGoogleLoading, 
    data: createUserGoogleData 
  }] = useMutation(CREATE_USER_GOOGLE)

  const submitLogin = async () => {
    await hubspotSignup(emailAddress, "")
    await mailchimpSignup(emailAddress, "")
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
      await createUser({
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

  const responseFacebook = async (response) => {
    if (response) {
      const [firstName, ...moreName] = response?.name?.split(' ')
      const lastName = moreName?.join(' ')
      const emailAddress = response?.email
      const facebookId = response?.id
      await createUserFacebook({
        variables: {
          firstName, 
          lastName,
          emailAddress,
          facebookId,
        }
      })

      await hubspotSignup(emailAddress, `${firstName} ${lastName}`)
      await mailchimpSignup(emailAddress, `${firstName} ${lastName}`)
    }
  }

  const responseGoogleSuccess = async (response) => {
    setLoginLoading(true)
    if (response.profileObj) {
      console.log(response)
      const firstName = response.profileObj.givenName
      const lastName = response.profileObj.familyName
      const emailAddress = response.profileObj.email
      const googleId = response.profileObj.googleId
      const googleToken = response.tokenId

      const createUserResponse = await createUserGoogle({
        variables: {
          firstName,
          lastName,
          emailAddress,
          googleId,
          googleToken,
        }
      })

      if (createUserResponse.data.userCreate.id) {
        hubspotSignup(emailAddress, `${firstName} ${lastName}`)
        mailchimpSignup(emailAddress, `${firstName} ${lastName}`)
        window.location.href = createUserResponse.data.userCreate.loginLink
      } else {
        setLoginLoading(false)
      }
    }
  }

  const responseGoogleFailure = (response) => {
    console.log(response)
  }

  const emailScreen = (
    <div className="w-full max-w-md">
      { /* <div className="w-full max-w-md font-bold">
        <FacebookLogin
          appId="783700495040097"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          render={renderProps => (
            <Button variant="outlined" className="w-full flex relative place-items-center" {...renderProps}>
              <Facebook className="w-8 inline absolute left-4" />
              <div className="inline flex-1">
                Sign in with Facebook
              </div>
            </Button>
          )}
        />
        </div> */ }
      <div className="w-full max-w-md font-bold">
        <GoogleLogin
          clientId="351154443072-0nvldf11qe5dc13dlf7hfator1g2ks3t.apps.googleusercontent.com"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          uxMode="popup"
          render={renderProps => (
            <Button variant="outlined" className="w-full flex relative place-items-center" {...renderProps}>
              <Google className="w-8 inline absolute left-4" />
              <div className="inline flex-1">
                Sign in with Google
              </div>
            </Button>
          )}
        />
      </div>
      <div className="w-full my-2 flex flex-wrap justify-center">
        <input 
          className="text-wfGray-800 p-4 text-left w-full max-w-md" 
          value={emailAddress} 
          onChange={changeEmailAddress} 
          placeholder="you@yourstore.com" />
      </div>
      <div className="w-full flex justify-center">
        <Button 
          className="py-6 px-8 sm:px-12 text-xl"
          variant="salmon" 
          loading={loginLoading}
          onClick={submitLogin}>
          Find Your Members
        </Button>
      </div>
    </div>
  )

  const loginScreen = (
    <div className="w-full max-w-md">
      <div className="w-full p-4 my-2 bg-white text-lg text-wfGray-800 max-w-xl">
        Welcome back, { userData?.userByEmail?.firstName }<br />
        <br />
        Looks like you already have an account. Sign in and let's get started.
      </div>
      <div className="w-full my-2 flex justify-center">
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
    </div>
  )

  const newAccountScreen = (
    <div className="w-full max-w-md">
      <div className="w-full p-4 my-2 bg-white text-lg text-wfGray-800">
        Welcome to Withfriends! Create a password, and let's get started!
      </div>
      <div className="w-full my-2 flex justify-center">
        <input 
          type="password"
          className="text-wfGray-800 p-4 text-left w-full" 
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
    </div>
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


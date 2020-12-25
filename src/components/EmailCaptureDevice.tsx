import React, { useState } from "react"
import { useApolloClient, useMutation, useLazyQuery } from "@apollo/client"
import { useQueryParam, NumberParam } from "use-query-params"
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
  const [queryV, setQueryV] = useQueryParam("v", NumberParam)

  const [showFindYourMembers, setShowFindYourMembers] = useState(true)
  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const [loginMessage, setLoginMessage] = useState(<span />)
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [searchEmailAddress, { 
    called: getUserCalled, 
    loading: getUserLoading, 
    data: userData 
  }] = useLazyQuery(GET_USER, {
    onCompleted: () => {
      setLoginLoading(false)
    },
    onError: () => {
      setLoginLoading(false)
    },
  })

  const [authorizeUser, { 
    called: authorizedUserCalled, 
    loading: authorizedUserLoading, 
    data: authorizedUserData 
  }] = useMutation(AUTHORIZE_USER)

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

  const sendToFacebook = () => {
    // @ts-ignore
    if (typeof window.fbq !== `function`) return

    // @ts-ignore
    window.fbq('trackCustom', 'BecomeAnOrganizer', {
      em: emailAddress,
      value: queryV,
      currency: "USD",
    })
  }

  const submitLogin = async () => {
    if (emailAddress.match(/.+\@.+\..+/)) {
      setLoginLoading(true)
      await hubspotSignup(emailAddress, "")
      await mailchimpSignup(emailAddress, "")
      searchEmailAddress({
        variables: {
          emailAddress 
        },
      })
      setLoginMessage(<span />)
    } else {
      setLoginMessage(
        <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
          Please enter an email address.
        </div>
      )
    }
  }

  const submitAuthorization = async () => {
    if (userData.userByEmail.id) {
      setLoginLoading(true)
      const response = await authorizeUser({
        variables: {
          id: userData.userByEmail.id,
          password
        }
      })

      if (response?.data?.userAuthorize?.loginLink) {
        setLoginMessage(
          <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
            Success! You should be redirected soon. Otherwise, <a className="underline" href={response.data.userAuthorize.loginLink}>click here to continue to find your members.</a>
          </div>
        )
        window.location = response.data.userAuthorize.loginLink
      } else if (!response?.data?.userAuthorize) {
        setLoginMessage(
          <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
            Incorrect password. Try again, or <a className="underline" href="https://withfriends.co">reset your password here</a>.
          </div>
        )
        setLoginLoading(false)
      }
    }
  }

  const submitNewUser = async () => {
    setLoginLoading(true)
    if (emailAddress && password) {
      let createUserResponse = await createUser({
        variables: {
          emailAddress,
          password,
        }
      })

      if (createUserResponse.data.userCreate.id) {
        let loginLink = createUserResponse.data.userCreate.loginLink + ",first_login"
        setLoginMessage(
          <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
            Success! You should be redirected soon. Otherwise, <a className="underline" href={loginLink}>click here to continue to find your members.</a>
          </div>
        )
        setShowFindYourMembers(false)
        sendToFacebook()
        await Promise.all([
          hubspotSignup(emailAddress, ``),
          mailchimpSignup(emailAddress, ``),
        ])
        setLoginLoading(false)
        window.location.href = loginLink
      } else {
        setLoginLoading(false)
      }
    }
    setLoginLoading(false)
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

      sendToFacebook()
      await hubspotSignup(emailAddress, `${firstName} ${lastName}`)
      await mailchimpSignup(emailAddress, `${firstName} ${lastName}`)
    }
  }

  const responseGoogleSuccess = async (response) => {
    setLoginLoading(true)
    if (response.profileObj) {
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
        const loginLink = createUserResponse.data.userCreate.loginLink + ",first_login"
        setLoginMessage(
          <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
            Success! You should be redirected soon. Otherwise, <a className="underline" href={loginLink}>click here to continue to find your members.</a>
          </div>
        )
        setShowFindYourMembers(false)
        sendToFacebook()
        await Promise.all([
          hubspotSignup(emailAddress, `${firstName} ${lastName}`),
          mailchimpSignup(emailAddress, `${firstName} ${lastName}`),
        ])
        setLoginLoading(false)
        window.location.href = loginLink
      } else {
        setLoginLoading(false)
      }
    }
  }

  const responseGoogleFailure = (response) => {
    setLoginMessage(
      <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
        Error logging you in. Try another method, or visit <a className="underline"
          href="https://withfriends.co/action/364/sign_up/modal">this page to reset your password.</a>
      </div>
    )
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
                Sign up with Google
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
      { loginMessage }
      <div className={`w-full flex justify-center ${showFindYourMembers ? "" : "hidden"}`}>
        <Button 
          className="py-6 px-4 sm:px-12 text-xl"
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
          className="text-wfGray-800 p-4 text-left w-full max-w-xl" 
          value={password} 
          onChange={changePassword} 
          placeholder="enter your password"
        />
      </div>
      { loginMessage }
      <div className="w-full flex justify-center">
        <Button 
          className={`py-6 px-8 sm:px-12 text-xl ${showFindYourMembers ? "" : "hidden"}`}
          variant="salmon" 
          loading={loginLoading}
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
      { loginMessage }
      <div className="w-full flex justify-center">
        <Button 
          className={`py-6 px-8 sm:px-12 text-xl ${showFindYourMembers ? "" : "hidden"}`}
          variant="salmon" 
          loading={loginLoading}
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
        getUserCalled && !getUserLoading ? (
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


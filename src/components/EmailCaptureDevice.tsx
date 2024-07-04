import React, { useState } from "react"
import { useMutation, useLazyQuery } from "@apollo/client"
import { useQueryParam, NumberParam, StringParam } from "use-query-params"
import GoogleLogin from "react-google-login"
import { mailchimpSignup } from "../helpers/mailchimp"
import { hubspotSignup } from "../helpers/hubspot"
import { becomeAnOrganizer, becomeASquareOrganizer } from "../helpers/mixpanel"
import UTMLink from "./UTMLink"

import Button from "./Button"
import IconItem from "./IconItem"
import Facebook from "./Facebook"
import Google from "./Google"

import {addAppUrl, oldAddAppUrl} from "../helpers/addapp"

import { 
  GET_USER, 
  AUTHORIZE_USER, 
  CREATE_USER_EMAIL,
  CREATE_USER_FACEBOOK,
  CREATE_USER_GOOGLE,
} from "../queries"

const EmailCaptureDevice = ({translationMapping, showModal, setShowModal,useOldLink = false, isBookstorePage = false}) => {
  const [queryV, setQueryV] = useQueryParam("v", NumberParam)
  const [queryEmail, setQueryEmail] = useQueryParam("email", StringParam)
  const [queryName, setQueryName] = useQueryParam("name", StringParam)
  const [queryFacebookId, setQueryFacebookId] = useQueryParam("facebookId", StringParam)

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
            Success! You should be redirected soon. Otherwise, <a className="underline" href={response.data.userAuthorize.loginLink}>click here to continue to find your {translationMapping.personPlural}.</a>
          </div>
        )
        window.location = response.data.userAuthorize.loginLink
      } else if (!response?.data?.userAuthorize) {
        setLoginMessage(
          <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
            Incorrect password. Try again, or <a className="underline" href={(process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/action/363/sign_in/modal"}>reset your password here</a>.
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
            Success! You should be redirected soon. Otherwise, <a className="underline" href={loginLink}>click here to continue to find your {translationMapping.personPlural}.</a>
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

  const responseGoogleSuccess = async (response) => {
    setLoginLoading(true)
    becomeAnOrganizer("google")
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

      if (createUserResponse.data?.userCreate?.id) {
        const loginLink = createUserResponse.data.userCreate.loginLink + ",first_login"
        setLoginMessage(
          <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
            Success! You should be redirected soon. Otherwise, <a className="underline" href={loginLink}>click here to continue to find your {translationMapping.personPlural}.</a>
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
    if (response?.error === "idpiframe_initialization_failed") {
    } else {
      setLoginMessage(
        <div className="border-4 border-salmon-700 text-salmon-700 bg-white font-bold p-4 my-2">
          Error logging you in through Google. Try another method, or visit <a className="underline"
            href={process.env.GATSBY_JELLY_URL + "/action/363/sign_in/modal"}>this page to reset your password.</a>
        </div>
      )
    }
  }

  const callFacebookRedirect = () => {
    becomeAnOrganizer("facebook")
    window.top.location.href = `https://www.facebook.com/v9.0/dialog/oauth?client_id=${process.env.GATSBY_FB_APP_ID}&redirect_uri=${process.env.GATSBY_FB_REDIRECT_URI}&scope=email`
  }

  const addAppMode = true

  const emailScreen = (addAppMode ? ( 
    <div className="w-full max-w-md">
      <div className={`w-full flex justify-center ${showFindYourMembers ? "" : "hidden"}`}>
      <UTMLink
        href={useOldLink ? oldAddAppUrl : addAppUrl}
        text="Start free trial"
      >
        <Button 
          className="py-6 px-4 sm:px-12 text-xl"
          variant="salmon" 
          loading={loginLoading}
          onClick={() => {
            becomeAnOrganizer("main");
          }}
        >
          {
            isBookstorePage ? "Get started for free" : "Start free trial"
          }
        </Button>
      </UTMLink>
      </div>
      <p className={`w-full text-center justify-center mt-4 md:mt-8 prose md:prose-lg font-bold text-white-700 ${showFindYourMembers ? "" : "hidden"}`} style={{color:"white"}}>
        {
         isBookstorePage ?
          <>
            Launch by July 8th and you won't pay monthly charges for the first three months.<br/>
          </>
         :
          <>
            Free to install.&nbsp;&nbsp;
          </>
        }
        {
          isBookstorePage ? 
            <a href="#pricing" style={{color:"white"}}>See our pricing details</a>
          : (
            <>
              <a href="/#pricing" style={{color:"white"}}>Additional charges</a>&nbsp;may apply.
            </>
          )
        }
      </p>
      <p className={`w-full text-center justify-center mt-4 md:mt-8 prose md:prose-lg text-white-700 ${showFindYourMembers ? "" : "hidden"}`} style={{color:"white", display: "none"}}>
        Or sign up without Shopify <a style={{color:"white"}} href={`${(process.env.GATSBY_JELLY_URL || "https://dev.better.space")}/action/364/sign_up/modal`} onClick={becomeASquareOrganizer}>here</a>.
      </p>
    </div>
  ) : (
    <div className="w-full max-w-md">
      <div className="w-full max-w-md font-bold">
        <Button 
          variant="outlined" 
          className="w-full flex relative place-items-center"
          onClick={callFacebookRedirect}
        >
          <Facebook className="w-8 inline absolute left-4" />
          <div className="inline flex-1">
            Sign up with Facebook
          </div>
        </Button>
      </div>
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
          Find Your {translationMapping?.personPlural ? translationMapping.personPlural.charAt(0).toUpperCase() + translationMapping.personPlural.slice(1) : "Members"}
        </Button>
      </div>
    </div>
  ))

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
          Add App
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


const fetch = require('node-fetch')

const facebookAccessTokenURL = "https://graph.facebook.com/v9.0/oauth/access_token"

const getTokenFromCode = async (code) => {
  const facebookCodeURLParams = new URLSearchParams({
    client_id: process.env.GATSBY_FB_APP_ID,
    redirect_uri: process.env.GATSBY_FB_REDIRECT_URI,
    client_secret: process.env.FB_APP_SECRET,
    code: code,
  })
  const facebookCodeURL = `${facebookAccessTokenURL}?${facebookCodeURLParams}`
  const response = await fetch(facebookCodeURL, { method: 'GET' })

  if (response?.ok) {
    return response.json()
  }
}

const getAppAccessToken = async () => {
  const params = new URLSearchParams({
    client_id: process.env.GATSBY_FB_APP_ID,
    client_secret: process.env.FB_APP_SECRET,
    grant_type: "client_credentials",
  })

  let response = await fetch(
    `${facebookAccessTokenURL}?${params}`, {
      method: 'GET',
    }
  )

  if (response?.ok) {
    return response.json()
  }
}

const verifyToken = async (input_token) => {
  const appAccessToken = await getAppAccessToken()
  const params = new URLSearchParams({
    input_token,
    access_token: appAccessToken.access_token,
  })

  const response = await fetch(
    `https://graph.facebook.com/debug_token?${params}`, {
      method: 'GET',
    }
  )

  if (response?.ok) {
    return response.json()
  } else {
    console.log(response)
  }
}

const getUserInfo = async (token, userId) => {
  const appAccessToken = await getAppAccessToken()
  const params = new URLSearchParams({
    access_token: token,
    fields: "email,name,picture",
  })

  const response = await fetch(
    `https://graph.facebook.com/v9.0/${userId}?${params}`, {
      method: 'GET',
    }
  )

  if (response?.ok) {
    return response.json()
  } else {
    console.log(response)
  }
}

const query = `
mutation CreateUserFacebook(
  $emailAddress: String,
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
    loginLink
  }
}
`

const userCreate = async (userInfo) => {
  const response = await fetch(
    process.env.GATSBY_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.ADMIN_JWT}`,
      },
      body: JSON.stringify({
        query, 
        variables: { 
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          emailAddress: userInfo.emailAddress,
          facebookId: userInfo.facebookId,
        }
      })
    }
  )

  if (response?.ok) {
    const body = await response.json()
    console.log(body)
    return body
  } else {
    console.log(response)
  }
}

exports.handler = async function(event, context) {
  const code = event.queryStringParameters.code
  const state = event.queryStringParameters.state

  const tokenResponse = await getTokenFromCode(code)
  if (!tokenResponse) return { statusCode: 400 }

  const accessToken = await getAppAccessToken()
  if (!accessToken) return { statusCode: 400 }

  const token = accessToken.access_token.split("|")
  if (token[0] !== process.env.GATSBY_FB_APP_ID) return { statusCode: 400 }

  const verifyTokenResponse = await verifyToken(tokenResponse.access_token)
  if (!verifyTokenResponse) return { statusCode: 400 }

  const facebookId = verifyTokenResponse.data.user_id
  const userInfo = await getUserInfo(tokenResponse.access_token, facebookId)

  if (!userInfo) return { statusCode: 400 }

  console.log(userInfo)

  const [firstName, ...moreName] = userInfo.name.split(' ')
  const lastName = moreName.join(' ')
  const emailAddress = userInfo.email

  const userResponse = await userCreate({
    firstName,
    lastName,
    emailAddress,
    facebookId,
  })

  if (!userResponse && userResponse.data.loginLink) return { statusCode: 400 }

  // Problems? Try https://stackoverflow.com/questions/29283040/how-to-add-custom-certificate-authority-ca-to-nodejs
  return {
    statusCode: 303,
    headers: {
      'Location': userResponse.data.userCreate.loginLink,
    }
  }
}


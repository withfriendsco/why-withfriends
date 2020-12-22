import fetch from 'isomorphic-fetch'
import Cookies from 'js-cookie'

export const hubspotSignup = async (emailAddress, personName) => {
  let hutk = Cookies.get('hubspotutk')
  if (hutk) {
    await fetch("https://api.hsforms.com/submissions/v3/integration/submit/6328349/3f74e9c6-2a87-41ab-9174-3635902f804c", {
      method: 'POST',
      body: JSON.stringify({
        fields: [
          {
            name: "email",
            value: emailAddress,
          },
        ],
        context: {
          hutk: hutk,
          pageUri: "https://why.withfriends.co",
          pageName: "Why Withfriends",
        },
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
}


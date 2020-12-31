exports.handler = async function(event, context) {
  console.log(process.env.GATSBY_GRAPHQL_API)
  console.log(process.env.GATSBY_PUBLIC_JWT)
  console.log(process.env.GATSBY_FB_APP_ID)
  console.log(process.env.GATSBY_FB_REDIRECT_URI)
  console.log(process.env.BASE_URL)
  console.log(process.env.FB_APP_SECRET)
  console.log(process.env.ADMIN_JWT)
}


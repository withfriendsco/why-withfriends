const MAILCHIMP_URL = "https://withfriends.us3.list-manage.com/subscribe/post"

export const mailchimpSignup = async (emailAddress, personName) => {
  const data = {
    u: "fc66ac9510984fc8932fa088d",
    id: "5a0f3790fa",
    EMAIL: encodeURIComponent(emailAddress),
    FNAME: encodeURIComponent(personName),
  }

  const queryString = Object.keys(data)
    .map(key => `${key}=${data[key]}`)
    .join("&")

  const url = `${MAILCHIMP_URL}?${queryString}`

  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `${encodeURIComponent("EMAIL")}=${encodeURIComponent(
      emailAddress
    )}&${encodeURIComponent("FNAME")}=${encodeURIComponent(personName)}`,
  })

  return response
}

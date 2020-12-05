import React, { useState } from "react"
import Button from "./Button"

const SubmitData = ({ message }: { message: React.Element }) => {
  return (
    <div className="bg-white border-salmon-600 rounded p-2 my-4 text-center text-wfGray-800">
      {message}
    </div>
  )
}

const MAILCHIMP_URL = "https://withfriends.us3.list-manage.com/subscribe/post"

const SignupForm = () => {
  const [emailAddress, setEmailAddress] = useState("")
  const [personName, setPersonName] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState(<span />)

  const changeEmailAddress = (ev: React.ChangeEvent<HTMLInputEvent>) => {
    setEmailAddress(ev.target.value)
  }

  const changePersonName = (ev: React.ChangeEvent<HTMLInputEvent>) => {
    setPersonName(ev.target.value)
  }

  const submitForm = async () => {
    setLoading(true)
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
    console.log(response)
    if (response.status == 200) {
      setSubmitMessage(<SubmitData message="Success! Thanks for joining." />)
    } else {
      setSubmitMessage(
        <SubmitData message='Problem signing you up. Press "Get Started" on the top right to try another way.' />
      )
    }
    setLoading(false)
  }

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="emailAddress" className="text-white">
          Your Email
        </label>
        <input
          id="emailAddress"
          type="email"
          value={emailAddress}
          onChange={changeEmailAddress}
          placeholder="you@yourbusiness.com"
          className="p-2 w-full text-xl"
        />
      </div>
      <div className="my-4">
        <label htmlFor="name" className="text-white">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          value={personName}
          onChange={changePersonName}
          placeholder="Your Name"
          className="p-2 w-full text-xl"
        />
      </div>
      {submitMessage}
      <div className="w-full flex justify-center mt-8">
        <Button variant="salmon" loading={loading} onClick={submitForm}>
          Sign Up
        </Button>
      </div>
    </div>
  )
}

export default SignupForm

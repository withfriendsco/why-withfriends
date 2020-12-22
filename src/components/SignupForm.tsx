import React, { useState } from "react"
import Button from "./Button"
import { mailchimpSignup } from "../helpers/mailchimp"
import { hubspotSignup } from "../helpers/hubspot"

const SubmitData = ({ message }: { message: React.Element }) => {
  return (
    <div className="bg-white border-salmon-600 rounded p-2 my-4 text-center text-wfGray-800">
      {message}
    </div>
  )
}

const SignupForm = () => {
  const [emailAddress, setEmailAddress] = useState("")
  const [personName, setPersonName] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState(<span />)

  const changeEmailAddress = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(ev.target.value)
  }

  const changePersonName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPersonName(ev.target.value)
  }

  const submitForm = async () => {
    setLoading(true)

    await hubspotSignup(emailAddress, personName)
    await mailchimpSignup(emailAddress, personName)

    setSubmitMessage(<SubmitData message="Success! Thanks for joining." />)
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

import React from "react"
import SignupForm from "./SignupForm"
import SidebarAd from "./SidebarAd"

const RightSidebar = () => (
  <div className="w-full flex-grow md:pl-8 md:border-l md:border-wfGray-300 md:max-w-xs lg:max-w-md">
    <h4
      style={{ fontFamily: "Avenir Heavy WF" }}
      className="mb-4 text-salmon-600 font-weight-bold"
    >
      Get in touch to learn more.
    </h4>
    <div className="bg-wfGray-600 shadow-lg p-8">
      <SignupForm />
    </div>
    <div className="mt-8 md:mt-16 w-full" />
    <SidebarAd />
  </div>
)

export default RightSidebar

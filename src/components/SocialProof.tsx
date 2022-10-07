import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useQuery } from "@apollo/client"
import { BUSINESS_DATA } from "../queries"

interface IBusinessFeature {
  alias: string
}

const BusinessFeature = ({ alias }: IBusinessFeature) => {
  const { data, loading, error } = useQuery(BUSINESS_DATA, {
    variables: { alias }
  })

  if (!data) return null

  const openPopup = (ev) => {
    // @ts-ignore
    if (!window.Withfriends) return
    // @ts-ignore
    window.Withfriends.Open_Popup(null, ev, alias, { Memberships: true })
  }

  return (
    <div className="w-full flex flex-wrap justify-center bg-white">
      <div className="max-w-screen-xl w-full flex flex-wrap sm:flex-nowrap justify-center text-center sm:text-left items-center">
        <div className="py-16 px-8 md:py-8 md:px-16 lg:py-12 xl:px-32 xl:py-16 order-3 sm:order-1" style={{"flexBasis": "75%"}}>
          <h2 className="mb-8 font-bold text-2xl md:mb-12 lg:mb-16 text-wfGray-800">
            { data?.businessWhere?.name }
          </h2>
          <p className="prose md:prose-md text-wfGray-800" dangerouslySetInnerHTML={{__html: data?.businessWhere?.mission}}></p>
          <p className="mt-4 md:mt-8 prose md:prose-lg font-bold">
            <button className="underline wf-membership-link" data-alias={alias} onClick={openPopup}>
              See their subscription tiers.
            </button>
          </p>
        </div>
        <div className="w-full sm:hidden order-2" />
        <div className="md:px-8 w-100 order-1 sm:order-3">
          <div className="border shadow-xl" 
            style={{
              position: "relative", 
              paddingBottom: "56.25%", 
              height: 0,
              backgroundImage: `url(${data?.businessWhere?.coverPhoto?.cdnPath})`,
              backgroundSize: "cover",
            }}
          >
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessFeature


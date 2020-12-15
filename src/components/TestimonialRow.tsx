import React from "react"
import Img from "gatsby-image"

const TestimonialRow = ({ node }) => (
  <div className="my-16">
    <div className="prose prose-md sm:prose-xl mb-8 leading-normal text-center sm:text-left">
      {node.quote}
    </div>
    <div className="flex">
      <div className="rounded-full mr-8">
        <Img
          className="rounded-full"
          imgStyle={{ objectFit: "contain" }}
          fixed={node.image?.childImageSharp.fixed}
          alt={node.name}
        />
      </div>
      <div className="sm:leading-loose text-center sm:text-left">
        <div className="font-bold">{node.name}</div>
        <div>{node.business}</div>
      </div>
    </div>
  </div>
)

export default TestimonialRow

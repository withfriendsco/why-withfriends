import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/Button"
import FeatureRow from "../components/FeatureRow"
import TestimonialRow from "../components/TestimonialRow"

import Cart from "../components/integrations/Cart"
import Chownow from "../components/integrations/Chownow"
import Discounts from "../components/integrations/Discounts"
import Easy from "../components/integrations/Easy"
import Eventbrite from "../components/integrations/Eventbrite"
import Pos from "../components/integrations/Pos"
import Shopify from "../components/integrations/Shopify"
import Square from "../components/integrations/Square"
import Squarespace from "../components/integrations/Squarespace"
import Tickets from "../components/integrations/Tickets"
import Toast from "../components/integrations/Toast"
import Value from "../components/integrations/Value"
import BecomeAnOrganizer from "../components/BecomeAnOrganizer"
import IconItem from "../components/IconItem"

import LocalBusinessVideoMp4 from "../videos/Local_Business.mp4"
import LocalBusinessVideoWebm from "../videos/Local_Business.webm"
import LocalBusinessVideoJpg from "../videos/Local_Business.jpg"

const PrimerTemplate = ({ data }) => {
  let imageFirst = false
  const featureRows = data.allFeatureRowsYaml.edges.map(node => {
    if (!node.node.only || node.node.only === data.platform.slug) {
      imageFirst = !imageFirst
      return (
        <FeatureRow
          key={node.node.id}
          imageFirst={imageFirst}
          featureRow={node.node}
        />
      )
    } else {
      return null
    }
  })

  const letsChat = () => {
    // @ts-ignore
    if (window.Intercom) {
      // @ts-ignore
      window.Intercom("show")
    }
  }

  return (
    <Layout>
      <SEO
        title="Membership and subscription box software for small businesses"
        url={`https://why.withfriends.co/organizers/${data.market.slug}/${data.platform.slug}/${data.build.slug}`}
      />
      <div className="flex flex-wrap md:flex-nowrap w-full justify-center bg-wfGray-800">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 z-0 object-cover w-screen h-screen bg-wfGray-800"
        >
          <source src={LocalBusinessVideoWebm} type="video/webm" />
          <source src={LocalBusinessVideoMp4} type="video/mp4" />
          <img alt="Local Business Bluestockings on Withfriends" src={LocalBusinessVideoJpg} />
          <p>Your browser does not support the video element.</p>
        </video>
        <div className="absolute flex flex-wrap max-w-screen-md z-10 text-white place-items-center h-screen">
          <div>
            <h1 className="text-center leading-tight mb-16 font-bold">
              Sell {data.build.name} for your{" "}
              {data.platform.store}, automatically
            </h1>
            <div className="w-full">
              <BecomeAnOrganizer />
            </div>
          </div>
          <div />
        </div>
      </div>

      <div className="h-screen -mb-24 sm:-mb-32" />

      <div className="flex flex-wrap justify-center px-4 -mx-4 md:-mx-8 text-xl sm:text-2xl md:text-4xl font-bold text-wfGray-800 py-8 sm:pt-16 bg-wfGray-100">
        <div className="w-full flex justify-center mb-8 md:mb-16">
          <p className="text-center max-w-screen-md leading-tight">
            Withfriends{" "}
            <span className="text-salmon-700">
              transforms {data.build.name} by upselling your customers
            </span>{" "}
            automatically with each purchase. <br />
            <br />
            On Withfriends, an average of{" "}
            <span className="text-salmon-700">one of every ten</span> customers
            will purchase a membership for your{" "}
            {data.market.short}, resulting in a
            <span className="text-salmon-700">
              &nbsp;60%&nbsp;increase in reliable monthly revenue.
            </span>
          </p>
        </div>
      </div>

      <div className="w-full px-2 sm:px-8">{featureRows}</div>

      <div className="w-full my-8" />
      <BecomeAnOrganizer />

      <div className="flex justify-center my-4 sm:my-16 flex-wrap">
        <h2 className="text-center my-4">
          If your {data.market.short} gets{" "}
          450 customers per month...
        </h2>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-wrap sm:flex-nowrap my-4 md:my-12">
            {data.market.images.map(image => (
              <Img
                className="w-full my-2 sm:mx-2 shadow-lg"
                fluid={image.childImageSharp.fluid}
                alt="Magic Moment"
              />
            ))}
          </div>
        </div>
        <h2 className="text-center mt-8">
          You'll make $38,880 per year on Withfriends!
        </h2>
        <div className="w-full my-4" />
        <BecomeAnOrganizer />
      </div>

      <div className="flex flex-wrap justify-center px-4 -mx-4 md:px-8 md:-mx-8 mt-8 md:mt-16 text-wfGray-800 py-8 md:py-16 bg-wfGray-100">
        <div className="text-center w-full max-w-2xl">
          <h3 className="text-2xl md:text-4xl font-normal my-2 sm:my-8">
            Automations and integrated services let you focus on your business,
            while we grow your memberships.
          </h3>
          <div className="flex my-8 flex-wrap">
            <IconItem icon={<Easy />} text="15 minutes to setup" />
            <IconItem icon={<Pos />} text="Point of sale upsell" />
            <IconItem icon={<Cart />} text="Online order upsell" />
            <IconItem icon={<Value />} text="Automated subscriptions" />
            <IconItem icon={<Tickets />} text="Ticketing upsell" />
            <IconItem icon={<Discounts />} text="Automated member discounts" />
          </div>
        </div>
        <div className="w-full sm:my-4" />
        <div className="text-center w-full max-w-2xl">
          <h3 className="text-2xl md:text-4xl font-normal sm:my-8">
            We integrate with your platform, however you reach your customers.
          </h3>
          <div className="flex my-8 flex-wrap">
            <IconItem icon={<Eventbrite />} text="Eventbrite integration" />
            <IconItem icon={<Shopify />} text="Shopify integration" />
            <IconItem icon={<Square />} text="Square integration" />
            <IconItem icon={<Squarespace />} text="Squarespace integration" />
            <IconItem icon={<Toast />} text="Toast integration" />
            <IconItem icon={<Chownow />} text="ChowNow integration" />
          </div>
        </div>
        <div className="w-full sm:my-4" />
        <div className="text-center w-full max-w-2xl">
          <h3 className="text-2xl md:text-4xl font-normal sm:my-8">
            ...and more, just ask!
          </h3>
        </div>
        <div className="w-full my-4" />
        <BecomeAnOrganizer />
      </div>

      <div className="flex justify-center my-4 sm:my-16 flex-wrap">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-wrap sm:flex-nowrap my-4 md:my-12">
            <div className="flex-1 border-salmon-700 border-2 mx-4 p-8 flex flex-col">
              <h4 className="flex-grow"><strong className="font-heavy">Case Study:</strong> How a band's merch store hit $100,000 recurring revenue in three months.</h4>
              <p className="prose prose-md md:prose-xl text-right mt-4">
                <Link to="/posts/subscription-boxes-stick-figure/" className="text-right">Read.</Link>
              </p>
            </div>
            <div className="flex-1 border-salmon-700 border-2 mx-4 p-8 flex flex-col">
              <h4 className="flex-grow"><strong className="font-heavy">Insights:</strong> How Withfriends memberships reduce subscription box churn.</h4>
              <p className="prose prose-md md:prose-xl text-right mt-4">
                <Link to="/posts/subscription-box-churn/" className="text-right">Read.</Link>
              </p>
            </div>
            <div className="flex-1 border-salmon-700 border-2 mx-4 p-8 flex flex-col">
              <h4 className="flex-grow"><strong className="font-heavy">Philosophy:</strong> How to convey a purpose that inspires growth.</h4>
              <p className="prose prose-md md:prose-xl text-right mt-4">
                <Link to="/posts/purpose/" className="text-right">Read.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl md:text-4xl text-center font-normal my-8 text-wfGray-800">
          Stories from Withfriends small businesses
        </h3>
        <div className="max-w-3xl mx-auto">
          <div
            style={{
              padding: "56.25% 0 0 0",
              position: "relative",
            }}
          >
            <iframe
              title="Stories from Withfriends small businesses"
              src="https://player.vimeo.com/video/383441579?autoplay=1&muted=1&loop=1&color=ffabac&title=0&byline=0&portrait=0"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              allow="autoplay; fullscreen"
            ></iframe>
          </div>
        </div>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
      <div className="flex justify-center">
        <div className="max-w-2xl">
          {data.allTestimonialsYaml.edges.map(node => (
            <TestimonialRow node={node.node} />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="max-w-2xl">
          <h3 className="text-2xl md:text-4xl leading-normal text-center mb-8 text-salmon-700 font-bold">
            Let your community help support your {data.market.name}.
          </h3>
          <BecomeAnOrganizer />
        </div>
      </div>

      <div className="flex flex-wrap justify-center px-8 -mx-4 md:-mx-8 mt-8 md:mt-16 text-wfGray-800 py-16 bg-wfGray-100">
        <div className="max-w-2xl text-center">
          <h3 className="text-2xl md:text-4xl leading-normal text-center mb-8">
            Have questions?
          </h3>
          <div className="my-8">
            Get in touch with us via the chat bubble in the bottom-right, or at
            (646) 846-6126.
          </div>
          <Button variant="outlined" onClick={letsChat}>
            Let's chat
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PrimerTemplateQuery($market: String!, $platform: String!, $build: String!) {
    platform: platformsYaml(slug: { eq: $platform }) {
      slug
      name
      store
    }

    market: marketsYaml(slug: { eq: $market }) {
      slug
      name
      plural
      short
      images {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

    build: buildsYaml(slug: { eq: $build }) {
      slug
      name
    }

    allFeatureRowsYaml {
      edges {
        node {
          id
          title
          content
          linkText
          link
          only
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    allTestimonialsYaml {
      edges {
        node {
          id
          quote
          name
          business
          image {
            childImageSharp {
              fixed(height: 80, cropFocus: ATTENTION) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`

export default PrimerTemplate


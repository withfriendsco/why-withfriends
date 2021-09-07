import React, {useEffect, useState} from "react"
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
import Box from "../components/integrations/Box"
import Package from "../components/integrations/Package"
import BecomeAnOrganizer from "../components/BecomeAnOrganizer"
import IconItem from "../components/IconItem"
import DoneIcon from "../components/DoneIcon"
import EmailCaptureDevice from "../components/EmailCaptureDevice"

import LocalBusinessVideoMp4 from "../videos/Local_Business.mp4"
import LocalBusinessVideoWebm from "../videos/Local_Business.webm"
import LocalBusinessVideoJpg from "../videos/Local_Business.jpg"
import WithfriendsAutomatedMemberTiersMp4 from "../videos/withfriends-automated-member-tiers.mp4"
import WithfriendsAutomatedMemberTiersWebm from "../videos/withfriends-automated-member-tiers.webm"
import WithfriendsUpsellYourCustomersMp4 from "../videos/shopify-upsell.mp4"
import WithfriendsUpsellYourCustomersWebm from "../videos/shopify-upsell.webm"
import BusinessFeature from "../components/SocialProof"

const PrimerTemplate = ({ data }) => {

  // Can't get global styles to work.
  useEffect(() => {
    if (!document.getElementById("global-styles")) {
      const style = document.createElement('style');
      style.id = 'global-styles';
      style.innerHTML = `
          body.hide_intercom #intercom-container {
            display:none !important;
        }
        body.hide_intercom .intercom-lightweight-app { 
            display:none !important;
        }
      `;
      document.body.appendChild(style);
    } 
  }, []);

  let imageFirst = false

  data.noSEM = (data.market.name == 'online store' && data.build.name == 'subscription boxes' && !data.platform.name)

  const translationMapping = {
    "person": data.build.name == 'memberships' ? 'member' : 'subscriber',
    "personPlural": data.build.name == 'memberships' ? 'members' : 'subscribers',
    "product": data.build.name == 'memberships' ? 'membership' : 'subscription',
    "productPlural": data.build.name == 'memberships' ? 'memberships' : 'subscriptions'
  }
  const ucfirst = (content) => content.charAt(0).toUpperCase() + content.slice(1)

  const featureRows = data.allFeatureRowsYaml.edges.map(node => {
    if (!node.node.only || node.node.only === data.platform.slug) {
      imageFirst = !imageFirst
      return (
        <FeatureRow
          key={node.node.id}
          imageFirst={imageFirst}
          featureRow={node.node}
          translationMapping={translationMapping}
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

  const [showModal, setShowModal] = useState(false);

  return (
    <Layout isPrimer={true} showModal={showModal} setShowModal={setShowModal}>
      <SEO
        title={`Withfriends | ${data.platform.name || "The best"} ${data.build.tool} for your ${data.market.name}.`}
        url={`https://why.withfriends.co/organizers/${data.market.slug}/${data.platform.slug}/${data.build.slug}`}
      />
      <div className="flex flex-wrap md:flex-nowrap w-full justify-center bg-wfGray-800">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 z-0 object-cover w-100 h-screen bg-wfGray-800"
        >
          <source src={LocalBusinessVideoWebm} type="video/webm" />
          <source src={LocalBusinessVideoMp4} type="video/mp4" />
          <img alt="Local Business Bluestockings on Withfriends" src={LocalBusinessVideoJpg} />
          <p>Your browser does not support the video element.</p>
        </video>
        <div className="absolute flex flex-wrap z-10 text-white place-items-center bg-opacity-75 py-20 sm:py-32 p-4 sm:p-16 w-full h-screen -my-24 sm:-my-32 -mx-4 bg-wfGray-800 justify-center" style={{marginLeft:0, marginRight:0}}>
          <div className="flex flex-wrap justify-center max-w-xl">
            <h1 className="text-center leading-tight mb-2 sm:mb-8 font-bold text-2xl sm:text-4xl">
              Sell {data.build.name}, automatically.
            </h1>
            <h2 className="text-center leading-tight mb-2 sm:mb-8 font-bold text-2xl sm:text-4xl">
              {
                data.noSEM ? 
                `The best ${data.build.tool} for your Shopify or Square store.` : 
                `The best ${data.platform.name} ${data.build.tool} for your ${data.market.name}.`
              }
            </h2>
            <div className="w-full" />
            <EmailCaptureDevice translationMapping={translationMapping} showModal={showModal} setShowModal={setShowModal}/>
          </div>
          <div />
        </div>
      </div>

      <div className="h-screen -mb-24 sm:-mb-32" />

      <div className="flex flex-wrap justify-center px-4 -mx-4 md:-mx-8 text-xl sm:text-2xl md:text-4xl font-bold text-wfGray-800 py-8 sm:pt-16 bg-wfGray-100">
        <div className="w-full flex justify-center mb-8 md:mb-16">
          <p className="text-center max-w-screen-md leading-tight">
          </p>
          <p className="text-center max-w-screen-md leading-tight">
            <span className="text-salmon-700">
              Sell ten times as many {data.build.name}
            </span>
            {" "}than on{" "}
            {(data.noSEM || data.platform.name == 'Shopify') ? 'Recharge' : 'other apps'}
            {" "}by using Withfriends to{" "}
            <span className="text-salmon-700">
              upsell your customers into {translationMapping.personPlural}
            </span>{" "}
            automatically during checkout. <br />
            <br />
            An average of{" "}
            <span className="text-salmon-700">one in fifteen</span> customers
            will purchase {data.build.name} for your{" "}
            {data.market.short}, earning you a
            <span className="text-salmon-700">
              &nbsp;60%&nbsp;increase in reliable monthly revenue.
            </span>
          </p>
        </div>
      </div>

      <div className="w-full flex py-4 md:py-16 justify-center">
        <div className="w-full flex flex-wrap justify-center">
          <div className="max-w-screen-xl w-full flex flex-wrap sm:flex-nowrap justify-center text-center sm:text-left items-center">
            <div className="w-full sm:hidden order-2" />
            <div className="pt-8 sm:p-8 md:p-12 order-3">
              <h2 className="mb-8 font-bold text-2xl md:mb-12 lg:mb-16 text-wfGray-800">
                Design your {data.build.name} automatically.
              </h2>
              <p className="prose md:prose-md text-wfGray-800">
                Not sure about the best {data.build.name} for your {data.market.short}? We'll get you through the writer's block.
                Connect your store, and we'll generate {translationMapping.product} tiers for maximum conversion,
                based on your data. We import your customers and orders,
                analyze your data, and create tiers custom-made to ensure you
                build sustaining revenue. You can customize them from there.
              </p>
              <p className="mt-4 md:mt-8 prose md:prose-lg font-bold text-salmon-700">
                <Link
                  to="/posts/memberships"
                  className="text-salmon-700 font-bold"
                >
                  Read more about how we design your {data.build.name}.
                </Link>
              </p>
            </div>
            <div className="md:px-8 w-100 order-1">
              <div className="border shadow-xl" style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
                <video
                  style={{maxWidth: "100%", height: "auto"}}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={WithfriendsAutomatedMemberTiersWebm} type="video/webm" />
                  <source src={WithfriendsAutomatedMemberTiersMp4} type="video/mp4" />
                  <p>Your browser does not support the video element.</p>
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex py-4 md:py-16 justify-center">
        <div className="w-full flex flex-wrap justify-center">
          <div className="max-w-screen-xl w-full flex flex-wrap sm:flex-nowrap justify-center text-center sm:text-left items-center">
            <div className="pt-8 sm:p-8 md:p-12 order-3 sm:order-1">
              <h2 className="mb-8 font-bold text-2xl md:mb-12 lg:mb-16 text-wfGray-800">
                Sell your {data.build.name} automatically.
              </h2>
              <p className="prose md:prose-md text-wfGray-800">
                Don't distract yourself from your core business - we'll sell your {data.build.name} for you.<br/>
                <br/>
                How do we do it? Our secret is that customers subscribe to your business, instead of to a specific product.<br/>
                <br/>
                Any customer that loves your business can become a {translationMapping.person}, not just the customers who need to restock. We automatically add upsells (in-browser, email, and SMS) for every single purchase on your store, driven by the unique story behind your {data.market.short}.<br/>
                <br/>
                That's what makes Withfriends 10x more effective than subscribe-and-save apps.
              </p>
              <p className="mt-4 md:mt-8 prose md:prose-lg font-bold text-salmon-700">
                <Link
                  to="/posts/purpose/"
                  className="text-salmon-700 font-bold"
                >
                  Read about how to write a purpose that inspires growth and reduces churn.
                </Link>
              </p>
            </div>
            <div className="w-full sm:hidden order-2" />
            <div className="md:px-8 w-100 order-1 sm:order-3">
              <div className="border shadow-xl" style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
                <video
                  style={{maxWidth: "100%", height: "auto"}}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={WithfriendsUpsellYourCustomersWebm} type="video/webm" />
                  <source src={WithfriendsUpsellYourCustomersMp4} type="video/mp4" />
                  <p>Your browser does not support the video element.</p>
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full my-8" />
      <BecomeAnOrganizer translationMapping={translationMapping} setShowModal={setShowModal}/>
      <div className="w-full my-8" />

      <div className="flex justify-center my-4 sm:my-16 flex-wrap">
        <a title="Insights" id="insights" href="#insights">
          <h2 className="text-2xl md:text-4xl text-center font-normal my-8 text-wfGray-800">Insights from Withfriends</h2>
        </a>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-wrap sm:flex-nowrap my-4 md:my-12">
            <div className="md:flex-1 w-full md:w-none border-salmon-700 border-2 mx-4 p-8 text-left flex flex-col my-4">
              <h4 className="flex-grow"><strong className="font-heavy">Case Study:</strong> How a band's merch store hit $100,000 recurring revenue in three months.</h4>
              <p className="prose prose-md md:prose-xl text-right mt-4">
                <Link to="/posts/subscription-boxes-stick-figure/" className="text-right">Read.</Link>
              </p>
            </div>
            <div className="md:flex-1 w-full md:w-none border-salmon-700 border-2 mx-4 p-8 text-left flex flex-col my-4">
              <h4 className="flex-grow"><strong className="font-heavy">Insights:</strong> How Withfriends memberships reduce subscription box churn.</h4>
              <p className="prose prose-md md:prose-xl text-right mt-4">
                <Link to="/posts/subscription-box-churn/" className="text-right">Read.</Link>
              </p>
            </div>
            <div className="md:flex-1 w-full md:w-none border-salmon-700 border-2 mx-4 p-8 text-left flex flex-col my-4">
              <h4 className="flex-grow"><strong className="font-heavy">Philosophy:</strong> How to convey a purpose that inspires growth.</h4>
              <p className="prose prose-md md:prose-xl text-right mt-4">
                <Link to="/posts/purpose/" className="text-right">Read.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-2 sm:px-8">
        {featureRows}
      </div>

      <div className="w-full my-8" />
      <BecomeAnOrganizer translationMapping={translationMapping} setShowModal={setShowModal}/>

      {
        data.market?.socialProof?.length &&
        <>
          <div className="flex flex-wrap justify-center px-4 -mx-4 md:px-8 md:-mx-8 text-wfGray-800 py-8">
            <h2 className="w-full text-2xl md:text-4xl text-center font-normal my-8 text-wfGray-800">
              See other { data.market.plural } on Withfriends
            </h2>
            { data.market.socialProof.map(alias => <BusinessFeature alias={alias} />) }
          </div>
     
          <div className="w-full my-8" />
          <BecomeAnOrganizer translationMapping={translationMapping} setShowModal={setShowModal}/>
        </>
      }

      <div className="flex flex-wrap justify-center px-4 -mx-4 md:px-8 md:-mx-8 mt-8 md:mt-16 text-wfGray-800 py-8 md:py-16 bg-wfGray-100">
        <a title="Pricing" id="pricing" href="#pricing">
          <h2 className="text-2xl md:text-4xl text-center font-normal my-8 text-wfGray-800">Our Pricing & Features</h2>
        </a>
        <div className="text-center w-full flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-wrap md:flex-nowrap my-4 md:my-12">
            <div className="md:flex-1 w-full md:w-none border-salmon-700 border-2 mx-4 p-8 text-left flex flex-col my-4 bg-white">
              <div className="flex-1">
                <h4 className="flex-grow font-heavy mb-4">{ucfirst(translationMapping.person)} Management Software</h4>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Management dashboard</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">{ucfirst(translationMapping.person)} import/export</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">{ucfirst(translationMapping.person)} messaging by tier</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Create and manage subscription boxes</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">{ucfirst(translationMapping.person)} events and ticketing</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Receive and auto-post {translationMapping.person} testimonials</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Integrations with Mailchimp, Shopify, Square, Squarespace, Eventbrite, and more.</div>
                </div>
              </div>
              <div className="border-t-2 border-wfGray-300 pt-4 mt-4">
                Manage your existing {translationMapping.personPlural} on Withfriends <strong className="font-heavy">for free.</strong>
              </div>
            </div>
            <div className="md:flex-1 w-full md:w-none border-salmon-700 border-2 mx-4 p-8 text-left flex flex-col my-4 bg-white">
              <div className="flex-1">
                <h4 className="flex-grow font-heavy mb-4">Receive One-Time Contributions</h4>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Hosted business profile</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Kickstarter-like drives for one-time donations</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Simple button for one-time payments</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Upsell during checkout</div>
                </div>
              </div>
              <div className="border-t-2 border-wfGray-300 pt-4 mt-4">
                We charge <strong className="font-heavy">5% of one-time contributions,</strong> plus a $0.30 + 2.9% fee charged by our payment processor.
              </div>
            </div>
            <div className="md:flex-1 w-full md:w-none border-salmon-700 border-2 mx-4 p-8 text-left flex flex-col my-4 bg-white">
              <div className="flex-1">
                <h4 className="flex-grow font-heavy mb-4">Subscription boxes and recurring {translationMapping.product} payments</h4>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Instant website checkout</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Upsell and integration with your online store or point-of-sale</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Subscription box fulfillment dashboard</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Gift {translationMapping.productPlural}</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">Automatic {translationMapping.person} lapse recovery</div>
                </div>
                <div className="flex">
                  <DoneIcon />
                  <div className="flex-1">{ucfirst(translationMapping.product)} drives</div>
                </div>
              </div>
              <div className="border-t-2 border-wfGray-300 pt-4 mt-4">
                We charge <strong className="font-heavy">10% of recurring payments</strong> for {translationMapping.productPlural}.
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mb-8" />
        <BecomeAnOrganizer translationMapping={translationMapping} setShowModal={setShowModal}/>
      </div>

      <div className="flex justify-center my-4 sm:my-16 flex-wrap">
        <h2 className="text-center my-4">
          If your {data.market.short} gets{" "}
          450 customers per month...
        </h2>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-screen-lg flex flex-wrap sm:flex-nowrap my-4 md:my-12">
            {data.market.images.map(image => (
              <Img
                key={image.id}
                className="w-full my-2 sm:mx-2 shadow-lg"
                fluid={image.childImageSharp.fluid}
                alt="Magic Moment"
              />
            ))}
          </div>
        </div>
        <h2 className="text-center mt-8">
          You'll make $38,880 in {translationMapping.productPlural} this year on Withfriends!
        </h2>
        <div className="w-full my-4" />
        <BecomeAnOrganizer translationMapping={translationMapping} setShowModal={setShowModal}/>
      </div>

      <div className="flex flex-wrap justify-center px-4 -mx-4 md:px-8 md:-mx-8 mt-8 md:mt-16 text-wfGray-800 py-8 md:py-16 bg-wfGray-100">
        <div className="text-center w-full max-w-2xl">
          <h3 className="text-2xl md:text-4xl font-normal my-2 sm:my-8">
            Automations and integrated services let you focus on your business,
            while our {data.platform.name} {data.build.tool} grows your {translationMapping.productPlural}.
          </h3>
          <div className="flex my-8 flex-wrap">
            <IconItem icon={<Easy />} text="15 minutes to setup" />
            <IconItem icon={<Pos />} text="Point of sale upsell" />
            <IconItem icon={<Cart />} text="Online order upsell" />
            <IconItem icon={<Tickets />} text="Ticketing upsell" />
            <IconItem icon={<Package />} text="Automated shipments" />
            <IconItem icon={<Discounts />} text={`Automated ${translationMapping.person} discounts`} />
          </div>
        </div>
        <div className="w-full sm:my-4" />
        <div className="text-center w-full max-w-2xl">
          <h3 className="text-2xl md:text-4xl font-normal sm:my-8">
            Our {data.build.tool} integrates with multiple platforms, however else you reach your customers.
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
        <BecomeAnOrganizer translationMapping={translationMapping} setShowModal={setShowModal}/>
      </div>

      <div>
        <h3 className="text-2xl md:text-4xl text-center font-normal my-8 text-wfGray-800">
          Stories from Withfriends businesses
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
            Let your community help support your {data.market.name == 'online store' ? data.market.short : data.market.name}.
          </h3>
          <BecomeAnOrganizer translationMapping={translationMapping} setShowModal={setShowModal}/>
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
      short
    }

    market: marketsYaml(slug: { eq: $market }) {
      slug
      name
      plural
      short
      socialProof
      images {
        id
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
      tool
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
            id
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
            id
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

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Words from Withfriends" />
    <div className="w-full">
      <article className="max-w-xl prose border-b border-wfGray-300 pb-4 my-4">
        <div className="prose text-4xl">How memberships can help your business</div>
        <p className="lede prose max-w-none">
          CEO and Co-Founder Joe Ahearn lays out a few simple ways that
          memberships can help your business &mdash; no matter what industry
          you're in.
        </p>
        <p className="text-right">
          <Link to="/">
            ...read more
          </Link>
        </p>
        <div className="text-wfGray-600 font-sm">Posted on Dec. 25, 2020 by Joe Ahearn</div>
      </article>

      <article className="max-w-xl prose border-b border-wfGray-300 pb-4 my-4">
        <div className="prose text-2xl">Subscription Boxes = PROFIT</div>
        <p className="prose max-w-none">
          Here's an article about subscription boxes. Read on to hear why
          shipping something to wherever all the time can do some great things
          for your business.
        </p>
        <div className="text-wfGray-600 font-sm">Posted on Dec. 25, 2020 by Joe Ahearn</div>
      </article>
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage

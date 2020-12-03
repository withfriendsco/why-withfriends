import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Words from Withfriends" />
    <article className="max-w-xl prose">
      <h2>How memberships can help your business</h2>
      <p className="lede prose">
        CEO and Co-Founder Joe Ahearn lays out a few simple ways that
        memberships can help your business &mdash; no matter what industry
        you're in.
      </p>
    </article>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
